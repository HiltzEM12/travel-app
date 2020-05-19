// JavaScript file for handling the objects returned from weatehrbit.io

// fetch wasn't working on the server, but this fixed that
const fetch = require("node-fetch");

// For handling the .env variables
const dotenv = require('dotenv');
dotenv.config();

// url to use to get the lat/lon from geonames.org using a city or other named place
const geoURL = 'http://api.geonames.org/searchJSON?q=';

//User ID for geoNames
const geoUID = process.env.GEO_USER_ID;

// Function to call the API
async function getGeoData(place){
    const apiURL = geoURL + place + '&fuzzy=0.8&username=' + geoUID;
    //console.log(apiURL)
    let geoData = []  // Data to return
    try {
        // Call the GEO API
        await fetch(apiURL)
        .then(res => res.json())
        .then(async function(res) { 
            // Make sure data was returned
            if('geonames' in res && res.geonames.length > 0){
                //console.log('Processed data',processGeoRes(res.postalCodes))
                //geoData.push(processGeoRes(res.postalCodes))
                geoData = processGeoRes(res.geonames);
            }
        })
        // .then(function(res){
        //    return res;
        // })
    } catch (error) {
        console.log('error in getGeoData', error);
    }
    //console.log('geoData return',geoData)
    return geoData;
}

// Function to process the array of results from the API call
// Only goes through the 1st 15 or until the end of the list
// Only selects the 1st distinct name (i.e. if there are 2 Charleston, SC, then only the 1st one is used)
// Use these to update the dropdown
async function processGeoRes(res){
    const maxL = 30; // Max loop iterations
    const placeDetails = []; // Array to store the place details
    // Go through the given array and create readable place names and get lat and lon
    for(let i = 0; i < res.length  && i < maxL; i++){
        //let placeInfo = {}; //Object to store into the array
        let tempName = ''; //Use to create the place name string
        if('name' in res[i]){
            tempName = res[i].name;
            //console.log(res[i].placeName);
        }
        if('adminName1' in res[i]){
            tempName = tempName + ', ' + res[i].adminName1;
            //console.log(res[i].placeName);
        }
        if('countryName' in res[i]){
            tempName = tempName + ', ' + res[i].countryName;
            //console.log(res[i].placeName);
        }
        //Only add the name to the list if it isn't already there
        if(typeof (placeDetails.find(x => x.displayName == tempName)) === 'undefined'){
            //Get the values via coalescing the values in case they aren't present
            let lat = res[i].lat || '';
            let lng = res[i].lng || '';
            let name = res[i].name || '';
            let toponymName = res[i].toponymName || '';
            let adminName1 = res[i].adminName1 || '';
            let countryName = res[i].countryName || '';
            placeDetails.push({
                    displayName: tempName, 
                    lat: lat, 
                    lng: lng,
                    name: name,
                    toponymName: toponymName,
                    adminName1: adminName1,
                    countryName: countryName
                })
        }
    }
    //console.log(placeDetails)
    // Update the dropdown list for the user to choose
    return placeDetails;
}

module.exports = {
    // testFunc,
    getGeoData
}