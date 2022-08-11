const express = require('express');
// const serverlessExpress = require('@vendia/serverless-express')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express();
const fetch = require('node-fetch');
app.use(cors())
app.use(bodyParser.json())

app.get('/api/station-info', (req, res) => {
    const url = `https://website-api.airvisual.com/v1/places/map/clusters?bbox=-115.64,35.9,-114.59,36.43&zoomLevel=6&units.temperature=celsius&units.distance=kilometer&units.pressure=millibar&AQI=US&language=en`;
    fetch(url).then(res => res.json()).then(json => res.send(json)).catch(err => res.status(500).json(`Error in getting station info ${err.message}`))
})

app.get('/api/station-aqi/:id', (req, res) => {
    const id = req.params.id
    const url = `https://website-api.airvisual.com/v1/stations/${id}/measurements?units.temperature=celsius&units.distance=kilometer&units.pressure=millibar&AQI=US&language=e`;
    fetch(url).then(res => res.json()).then(json => res.send(json)).catch(err => res.status(500).json(`Error in getting station aqi ${err.message}`))
})


app.listen(3000, () => {console.log('server started')}) 