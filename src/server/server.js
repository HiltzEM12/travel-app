// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//User ID for geoNames
const geoID = {
    uid: process.env.GEO_USER_ID
}

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