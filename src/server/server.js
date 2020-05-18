// // Setup empty JS object to act as endpoint for all routes
// projectData = {};

var geoNames = require("./geoNamesSS");
var weatherBit = require("./weatherBitSS");

// For handling the .env variables
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// fetch wasn't working on the server, but this fixed that
const fetch = require("node-fetch");

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server

// Define what port to use
const port = 3000;

// Callback function for the server listener
function listening() {
    console.log('Travel App Server running');
    console.log(`Running on localhost: ${port}`);
}

// Initiate a server.  Takes the port and a callback function
const server = app.listen(port, listening);

// POST route for geoName API calls
app.post('/geo', async function (request, response) {
    const place = request.body.text;
    try {
        const res = await geoNames.getGeoData(place);
        response.send(JSON.stringify(res));
    } catch (error) {
        console.log('error in getGeo', error);
    }
});

// POST route for getting the weather
app.post('/weather', async function (request, response) {
    const tripDate = request.body.text.date;
    const lat = request.body.text.lat;
    const lng = request.body.text.lng;
    try {
        //console.log('test',weatherBit.getWeatherData(tripDate, lat, lng))
        //console.log('getWeatherData call')
        const res = await weatherBit.getWeatherData(tripDate, lat, lng);
        //console.log('Sending response',res)
        //console.log('return this from server',JSON.stringify(res));
        response.send(JSON.stringify(res));
        // .then(function(res){
        //     console.log('return this from server',res);
        //     response.send(res);
        // })
    } catch (error) {
        console.log('error in getWeather', error);
    }
});

