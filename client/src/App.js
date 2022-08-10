import './App.css';
import { MapContainer, TileLayer, Popup, Circle, LayerGroup, GeoJSON, Polygon } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import lasVegasBuidlingData from './data/SN2_buildings_train_AOI_2_Vegas_geojson_buildings_img1621.json'

import lasVegasData from "./data/lasVegasAirQuality.json"

function between(x, min, max) {
  return x >= min && x < max;
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
    return {color: 'lime'};
  } else {
    return {weight: 1, color: 'grey'}
  }
}

function App() {
  const limeOptions = { color: 'lime' }

  return (
    <MapContainer center={[36.157152835972575, -115.26013259990556]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LayerGroup>
        {
          lasVegasData.markers.map(station => (
            <Circle center={[station.coordinates.latitude, station.coordinates.longitude]} radius={2000} pathOptions={setDisplayColor(station.aqi)}>
              <Popup><div>
                <h3>{station.name}</h3>
                <h2>AQI: {station.aqi}</h2>
              </div></Popup>
            </Circle>
          ))
        }
      </LayerGroup>
      {
        <LayerGroup>
          {lasVegasBuidlingData.features.map(building => (
            <Polygon pathOptions={setBuildingColor(building)} positions={building.geometry.coordinates[0].map(x => [x[1], x[0]])}>
              <Popup>
                <p>{building.geometry.coordinates[0].map(x => [x[1], x[0]])[0]}</p>
              </Popup>
              </Polygon>
          ))}
        </LayerGroup>
      }
    </MapContainer>
  );
}

export default App;
