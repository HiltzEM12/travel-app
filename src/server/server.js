// // Setup empty JS object to act as endpoint for all routes
// projectData = {};

var geoNames = require("./geoNamesSS");
var weatherBit = require("./weatherBitSS");

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


//GeoName API calls***********************************************************************************************************
// url to use to get the lat/lon from geonames.org using a city or other named place
const geoURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';

// Get user ID to use for the GeoNames API
//User ID for geoNames
const geoUID = process.env.GEO_USER_ID;
let geoData = {}; //Use to return the geo data found


// POST rount for geoName API calls
app.post('/geo', async function (request, response) {
    //console.log('In /geo post');
    place = request.body.text;
    const apiURL = geoURL + place + '&username=' + geoUID;
    try {
        // Call the GEO API
        await fetch(apiURL)
        .then(res => res.json())
        .then(function(res) { 
            //console.log('api result');
            //Process results then send
            if('postalCodes' in res && res.postalCodes.length > 0){
                //console.log(geoNames.processGeoRes(res.postalCodes));
                //processGeoRes(res.postalCodes);
                //console.log(JSON.stringify(res))  //Use to get json example
                return geoNames.processGeoRes(res.postalCodes);
            }
            else {
                return res;
            }
            //console.log(geoNames.processGeoRes(res));
            //response.send(res);
            //geoData = res;
        })
        .then(function(res){
            response.send(res);
        })
    } catch (error) {
        console.log('error in getGeo', error);
    }
    // //console.log(getGeo(place));
    // await getGeo(place)
    // //.then(res => res.json())
    // .then(function (res){
    //     console.log('sending api results');
    //     response.send(res);
    // });
});




//Weatherbit API calls***********************************************************************************************************
// Get user ID to use for the GeoNames API
//User ID for geoNames
const weatherKey = process.env.WEATHER_KEY;



// POST rount for geoName API calls
app.post('/weather', async function (request, response) {
    //console.log('In /weather post');
    //console.log('txt ',request.body.text);
    // console.log('date ',request.body.text.date);
    // console.log('date ',request.body.text.lat);
    // console.log('date ',request.body.text.lng);
    const tripDate = request.body.text.date;
    const lat = request.body.text.lat;
    const lng = request.body.text.lng;
    weatherBit.getWeatherURL(tripDate)
    //console.log('latLng ',request.body.text.latLng);
    //console.log('lat ',request.body.text.latLng.json());
    //console.log('lng ',request.body.text.latLng.lng);
    //const apiURL = weatherCurrentURL + place + '&username=' + geoUID;
    // try {
    //     // Call the GEO API
    //     await fetch(apiURL)
    //     .then(res => res.json())
    //     .then(function(res) { 
    //         //console.log('api result');
    //         //Process results then send
    //         if('postalCodes' in res && res.postalCodes.length > 0){
    //             //console.log(geoNames.processGeoRes(res.postalCodes));
    //             //processGeoRes(res.postalCodes);
    //             //console.log(JSON.stringify(res))  //Use to get json example
    //             return geoNames.processGeoRes(res.postalCodes);
    //         }
    //         else {
    //             return res;
    //         }
    //         //console.log(geoNames.processGeoRes(res));
    //         //response.send(res);
    //         //geoData = res;
    //     })
    //     .then(function(res){
    //         response.send(res);
    //     })
    // } catch (error) {
    //     console.log('error in getGeo', error);
    // }
});








// GET route for geoName API calls
// app.get('/geo', function (request, response) {
//     console.log('In /geo get');
//     //console.log(geoData);
//     response.send(geoData);
// });

// async function getGeo(place){
//     console.log('In getGeo');
//     const apiURL = geoURL + place + '&username=' + geoUID;
//     //console.log(apiURL)
//     try {
//         // Call the GEO API
//         await fetch(apiURL)
//         .then(res => res.json())
//         .then(function(res) { 
//             console.log('api result')
//             return res;
//             //geoData = res;
//         })
//     } catch (error) {
//         console.log('error in getGeo', error);
//     }
// }

// // Get the geoNames user ID
// app.get('/geo', function (request, response) {
//     console.log('getting UID')
//     response.send(geoID);
// });

//Previous get and posts from the weather app
// // GET route
// app.get('/weather', function (request, response) {
//     response.send(projectData);
// });

// // POST route
// app.post('/weather', function (request, response) {

//     projectData.temperature = request.body.temperature;
//     projectData.date = request.body.date;
//     projectData.userResponse = request.body.userResponse;

//     response.send(projectData);
// });