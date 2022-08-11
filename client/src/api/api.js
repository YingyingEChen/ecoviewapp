export const fetchStationInfo = async () => {
    const url = `http://localhost:3000/api/station-info`;
    const response = await fetch(url);
    const data = await response.json();
    return data.markers
};

export const fetchStationAqi = async (id) => {
    const response = await fetch(`http://localhost:3000/api/station-aqi/${id}`);
    const data = await response.json();
    const dailyData = data.measurements.daily.map(x => x.aqi);
    return dailyData.filter(x => x !== undefined)
};
