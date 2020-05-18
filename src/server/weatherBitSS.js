// JavaScript file for handling the objects returned from weatehrbit.io

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

//Function to get the weatehr url to use depending on when the date is
function getWeatherURL(tripDate){
    const curDate = Date.now();
    console.log('curDate',curDate)
    console.log('tripDate',tripDate)
    console.log('tripDate',Date.parse(tripDate))
    console.log('Difference in days',(tripDate - curDate)/(1000 * 60 * 60 * 24));
}

module.exports = {
    getWeatherURL
}

