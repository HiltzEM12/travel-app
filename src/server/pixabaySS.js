// JavaScript file for handling the objects returned from https://pixabay.com/

// fetch wasn't working on the server, but this fixed that
const fetch = require("node-fetch");

// For handling the .env variables
const dotenv = require('dotenv');
dotenv.config();

// url to use to get the lat/lon from geonames.org using a city or other named place
const pixabayURL = 'https://pixabay.com/api/?key=';

//User ID for geoNames
const pixabayKEY = process.env.IMAGE_KEY;


// Function to call the API
async function getPics(term){
    const apiURL = pixabayURL + pixabayKEY + '&q=' + term + '&image_type=photo';
    //console.log(apiURL)
    
}

module.exports = {
    getPics
}