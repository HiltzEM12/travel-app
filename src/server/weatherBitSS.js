// JavaScript file for handling the objects returned from weatehrbit.io

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
    const forcastURL = getForcastURL(tripDate);
    try {
        if(forcastURL !== ''){
            forcastURL = forcastURL + '?&lat=' + lat + '&lon=' + lng +'&key=' + weatherKey + '&units=I';
            //console.log(apiURL)
            // Call the GEO API
            await fetch(forcastURL)
            .then(res => res.json())
            .then(function(res) { 
                //Process results then send
                //console.log(JSON.stringify(res))  //Use to get json example
                if('data' in res && res.data.length > 0){
                    console.log(weatherBit.processForcastData(res.data));
                    return 1;
                }
                else {
                    return res;
                }
            })
            .then(function(res){
                //response.send(res);
            })
        }
        else {
            response.send(''); //Send nothing.  Forcast is not applicable
        }
    } catch (error) {
        console.log('error in getWeather', error);
    }
}

//Function to get the forcast url if the trip date is within 16 days
//Returns a blank string otherwies
function getForcastData(tripDate, lat, lng){
    //Get the differences in days between now and the time of the trip
    const dateDiff = dayDiff(new Date(tripDate),new Date());
    if(dateDiff <= 16){
        forcastURL = weatherForcastURL + '?&lat=' + lat + '&lon=' + lng +'&key=' + weatherKey + '&units=I';

        return 1;
    }
    else{
        return {forcast: {}};
    }
};

// function getCurrentWeatherURL(){
//     return weatherCurrentURL;
// }

function processForcastData(res){
    const weatherDetails = []; // Array to store the place details
    // Go through the given array and create readable place names and get lat and lon
    for(let i = 0; i < res.length; i++){
        let weatherDate = res[i].valid_date;
        let maxTemp = res[i].max_temp;
        let minTemp = res[i].min_temp;
        let precip = res[i].pop; //Probability of Precipitation
        let desc = res[i].weather.description;
        let wIcon = res[i].weather.icon; // Weather description icon (i.e. https://www.weatherbit.io/static/img/icons/t01d.png)

        weatherDetails.push(
            {
                weatherDate: weatherDate, 
                maxTemp: maxTemp, 
                minTemp: minTemp,
                precip: precip,
                desc: desc,
                wIcon: wIcon
            }
        )
        // }
    }
    //console.log(placeDetails)
    // Update the dropdown list for the user to choose
    return weatherDetails;
}

module.exports = {
    //getForcastURL,
    getWeatherData,
    //processForcastData
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

