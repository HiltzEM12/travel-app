// JavaScript file for handling the objects returned from weatehrbit.io

// fetch wasn't working on the server, but this fixed that
const fetch = require("node-fetch");

// For handling the .env variables
const dotenv = require('dotenv');
dotenv.config();

//API key
const weatherKey = process.env.WEATHER_KEY;

// url to use to get the current weather
// Example: https://api.weatherbit.io/v2.0/current?&lat=38.123&lon=-78.543&key=API_KEY
const weatherCurrentURL = 'https://api.weatherbit.io/v2.0/current';

// url to use to get the forcast
// Example: https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key=API_KEY
const weatherForcastURL = 'https://api.weatherbit.io/v2.0/forecast/daily';

// Actual Instructions:
//   If the trip is within a week, you will get the current weather forecast.
//   If the trip is in the future, you will get a predicted forecast.

// Interpreted instructions since the given instructions are illogical
//   Get the current weather of the location
//   Get the forcast if the trip is within 16 days

// Returns current weatehr and forcast data in a JSON string
async function getWeatherData(tripDate, lat, lng){
    //const forcastURL = getForcastURL(tripDate);
    let forcastData = null;
    let currentData = null;
    try {

        //Get forcast data
        await getForcastData(tripDate, lat, lng)
        .then(function(res){
            forcastData =  res;
        })

        // Get current weather data
        await getcurrentData(lat, lng)
        .then(function(res){
            currentData =  res;
        })

    } catch (error) {
        console.log('error in getWeather', error);
    }

    // Combine the current and forcast data into a single JSON object
    return {'current': [currentData], 'forcast': [forcastData]};
}

//Function to get the forcast data if the trip date is within 16 days
//Returns a blank string otherwies
async function getForcastData(tripDate, lat, lng){
    let forcastData = [];  // Data to return
    //Get the differences in days between now and the time of the trip
    const dateDiff = dayDiff(new Date(tripDate),new Date());
    //Get the forcast data if trip is within 16 days
    if(dateDiff <= 16){
        const forcastURL = weatherForcastURL + '?&lat=' + lat + '&lon=' + lng +'&key=' + weatherKey + '&units=I';
        try{
            await fetch(forcastURL) //Call to the api
            .then(res => res.json())
            .then(async function(res) { 
                //Process results then return
                if('data' in res && res.data.length > 0){
                    forcastData = await processForcastData(res.data);
                }
            })
        }
        catch (error){
            console.log('error in getForcastData', error);
        }
    }
    return forcastData;
};

async function processForcastData(res){
    const forcastDetials = []; // Array to store the place details
    // Go through the given array and create readable place names and get lat and lon
    for(let i = 0; i < res.length; i++){
        let weatherDate = res[i].valid_date;
        let maxTemp = res[i].max_temp;
        let minTemp = res[i].min_temp;
        let precip = res[i].pop; //Probability of Precipitation
        let desc = res[i].weather.description;
        let wIcon = res[i].weather.icon; // Weather description icon (i.e. https://www.weatherbit.io/static/img/icons/t01d.png)

        forcastDetials.push(
            {
                weatherDate: weatherDate, 
                maxTemp: maxTemp, 
                minTemp: minTemp,
                precip: precip,
                desc: desc,
                wIcon: wIcon
            }
        )
    }
    return forcastDetials;
}

//Function to get the difference of 2 dates in days
// Both dates must be in a date format
function dayDiff(date1,date2){
    //Get just the dates.  Arguments should have times though to avoid UTC errors
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const toDays = 1000 * 60 * 60 * 24 //Use to divide the datetime numeric value to convert to days
    return Math.floor((d1-d2)/toDays);
};

//Function to get the current weather of an area
async function getcurrentData(lat, lng){
    let currentData = [];  // Data to return
    //Get the forcast data if trip is within 16 days
        const currentURL = weatherCurrentURL + '?&lat=' + lat + '&lon=' + lng +'&key=' + weatherKey + '&units=I';
        try{
            await fetch(currentURL) //Call to the api
            .then(res => res.json())
            .then(async function(res) { 
                //Process results then return
                if('data' in res && res.data.length > 0){
                    currentData = await processCurrentData(res.data);
                }
            })
        }
        catch (error){
            console.log('error in getcurrentData', error);
        }
    return currentData;
};

// Wrapper function to process the api results into a customer JSON object
async function processCurrentData(res){
    const retVal = 
            {
                windSpd: res[0].wind_spd, 
                temp: res[0].temp, 
                feelsLike: res[0].app_temp,
                clouds: res[0].clouds,
                desc: res[0].weather.description,
                wIcon: res[0].weather.icon
            }
    return retVal;
};


module.exports = {
    getWeatherData,
};


