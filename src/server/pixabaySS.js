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
// WIll always return the url of the 1st picture found.
// API call defaults to sorting the pictures by popularity
async function getPics(name, adminName1, countryName){
    //console.log('in getPics')

    const apiURLStart = pixabayURL + pixabayKEY + '&q=' ;
    const apiURLEnd = '&image_type=photo';

    const rtn = [];  //What to return

    //Replace all spaces with plus signs
    name = name.replace(/\s+/g, '+');
    adminName1 = adminName1.replace(/\s+/g, '+');
    countryName = countryName.replace(/\s+/g, '+');

    //Create an array of search terms for specific place to country
    //Replace spaces with pluses to use in the url search terms
    const terms = [];
    //1st is city and local place
    terms.push(name + '+' +adminName1);

    //Next is city and county
    terms.push(name + '+' +countryName);

    //Next just the local place
    terms.push(adminName1);

    //Next just the country
    terms.push(countryName);
    
    //Go through each search until something is returned or all have been searched
    for(let i = 0; i < terms.length; i++){
        let apiURL = apiURLStart + terms[i] + apiURLEnd;
        try {

        }
        catch(error){
            console.log('error in getPics',error);
            break;
        }
    }
    return rtn;
}

module.exports = {
    getPics
}