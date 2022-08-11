import { MapContainer, TileLayer, Popup, Circle, LayerGroup, Polygon } from 'react-leaflet';

import lasVegasBuidlingData from '../data/SN2_buildings_train_AOI_2_Vegas_geojson_buildings_img1621.json'

import { useEffect, useState } from 'react';
import { fetchStationInfo, fetchStationAqi } from '../api/api';
import LandInfo from './LandInfo';
import Profile from './Profile';


function between(x, min, max) {
    return x >= min && x <= max;
}

function setDisplayColor(aqi) {
    if (between(aqi, 0, 50)) {
        return { weight: 1, color: 'green', opacity: aqi / 150 * 0.8, fillOpacity: aqi / 50 * 0.8 };
    } else if (between(aqi, 51, 100)) {
        return { weight: 1, color: 'yellow', opacity: aqi / 150 * 0.8, fillOpacity: aqi / 100 * 0.8 };
    } else if (between(aqi, 101, 150)) {
        return { weight: 1, color: 'orange', opacity: aqi / 150 * 0.8, fillOpacity: aqi / 150 * 0.8 };
    } else if (between(aqi, 151, 200)) {
        return { weight: 1, color: 'red', opacity: aqi / 150 * 0.8, fillOpacity: aqi / 200 * 0.8 };
    }
    else if (between(aqi, 201, 300)) {
        return { weight: 1, color: 'purple', opacity: aqi / 150 * 0.8, fillOpacity: aqi / 300 * 0.8 };
    }
    else if (between(aqi, 301, 500)) {
        return { weight: 1, color: 'maroon', opacity: aqi / 150 * 0.8, fillOpacity: aqi / 500 * 0.8 };
    }
    else {
        return { color: 'grey' };
    }
}

function setBuildingColor(building) {
    const coordinates = building.geometry.coordinates[0].map(x => [x[1], x[0]])[0];
    if (coordinates[0] === 36.156830512000056 && coordinates[1] === -115.26123572) {
        return { color: 'lime' };
    } else {
        return { weight: 1, color: 'grey' }
    }
}

const average = arr => Math.ceil(arr.reduce((p, c) => p + c, 0) / arr.length);

function StationCircle(station) {
    const [stationData, setStationData] = useState(null);
    station = station.station;
    useEffect(() => {
        fetchStationAqi(station.id).then(arr => average(arr)).then(aqi => setStationData(aqi));
    }, [station.id])

    return (<Circle center={[station.coordinates.latitude, station.coordinates.longitude]} radius={2000} pathOptions={setDisplayColor(stationData ? stationData : station.aqi)}>
        <Popup><div>
            <h3>{station.name}</h3>
            <h2>AQI: {stationData ? stationData : station.aqi}</h2>
        </div></Popup>
    </Circle>)

}

function Map() {
    const [stationInfo, setStationInfo] = useState([]);
    const [show, toggleShow] = useState(false);
    const [buildingInfo, setBuildingInfo] = useState(undefined);


    useEffect(() => {
        fetchStationInfo().then(response => {
            setStationInfo(response)
        });
    }, [])

    if (!stationInfo[0]) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <section className="sm:flex-row flex flex-col flex-1">
            <div
                className="content-box"
                style={{ flexGrow: 2, flexBasis: "0%" }}
            >
                <MapContainer center={[36.157152835972575, -115.26013259990556]} zoom={12} scrollWheelZoom={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LayerGroup>
                        {
                            stationInfo.map(station => (<StationCircle station={station} />))
                        }
                    </LayerGroup>
                    {
                        <LayerGroup>
                            {lasVegasBuidlingData.features.map(building => (
                                <Polygon pathOptions={setBuildingColor(building)} positions={building.geometry.coordinates[0].map(x => [x[1], x[0]])} eventHandlers={{
                                    click: () => {
                                        toggleShow(!show)
                                        setBuildingInfo(building)
                                    }
                                }}>
                                    {/* <Popup>
                                        <p>{building.geometry.coordinates[0].map(x => [x[1], x[0]])[0]}</p>
                                    </Popup> */}
                                </Polygon>
                            ))}
                        </LayerGroup>
                    }
                </MapContainer>
            </div>
            {show && <div
                className="content-box"
                style={{ flexGrow: 1, flexBasis: "0%" }}
            >
                <LandInfo building={buildingInfo} />
                {/* <Profile /> */}
            </div>}
        </section>
    );
}


export default Map;