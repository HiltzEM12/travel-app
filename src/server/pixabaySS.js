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
// Go find a picture of the specific place when possible
// WIll drill up to a lower search resolution until a picture is found
async function getPics(name, toponymName, adminName1, countryName){
    console.log('in getPics')
    let apiURL = pixabayURL + pixabayKEY + '&q=' + countryName + '&image_type=photo';
    console.log(apiURL)
    
}

module.exports = {
    getPics
}