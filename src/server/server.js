var path = require('path')
const express = require('express')

// Environment Variables
const dotenv = require('dotenv')
dotenv.config()

const geoNamesUsernameObject = {
    username: process.env.geoNamesAPI_USERNAME
}

const weatherbitApiKeyObject = {
    apiKey: process.env.weatherbitAPI_KEY
}

const pixabayApiKeyObject = {
    apiKey: process.env.pixabayAPI_KEY
}

let coordinatesObject = {},
    weatherbitObject = {};

const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));

// Cors for cross origin allowance
const cors = require('cors');
const { json } = require('body-parser')
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function() {
    console.log(`FEND Capstone app listening on port ${this.address().port}!`)
})



app.get('/geoNamesUsername', function(req, res) {
    res.send(geoNamesUsernameObject);
})

app.get('/weatherbitKey', function(req, res) {
    res.send(weatherbitApiKeyObject);
})

app.get('/pixabayKey', function(req, res) {
    res.send(pixabayApiKeyObject);
})

app.post('/addCoordinates', function(req, res) {
    coordinatesObject = req.body;
    res.end(JSON.stringify({ status: 200, message: "success", coordinatesObject: coordinatesObject }));
})

app.get('/getCoordinates', function(req, res) {
    res.send(coordinatesObject);
})

app.post('/addWeatherbitObject', function(req, res) {
    weatherbitObject = req.body;
    res.end(JSON.stringify({ status: 200, message: "success", weatherbitObject: weatherbitObject }));
})

app.get('/getWeatherbitObject', function(req, res) {
    res.send(weatherbitObject);
})

app.post('/addPixabayObject', function(req, res) {
    pixabayObject = req.body;
    res.end(JSON.stringify({ status: 200, message: "success", pixabayObject: pixabayObject }));
})

app.get('/getPixabayObject', function(req, res) {
    res.send(pixabayObject);
})

module.exports = app;