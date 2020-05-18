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
    // //Get current date as just a date (remove times)
    // const today = new Date();
    // const todayYr = today.getFullYear();
    // const todayMo = today.getMonth();
    // const todayDay = today.getDate();
    // //const curDate = new Date(todayYr, todayMo, todayDay);
    // const curDate = Date.parse(todayYr + '-' + todayMo + '-' + todayDay)
    // console.log('curDate',curDate)
    // console.log('tripDate',tripDate)
    // console.log('tripDate',Date.parse(tripDate))
    //Get the differences in days between now and the time of the trip
    const dateDiff = dayDiff(new Date(tripDate),new Date());

    //delete
    //const tripDate = new Date("2020-05-22"+'T00:00')
    //departure.value = ('max', dateFormat(maxDate, 'yyyy-mm-dd');
    //dayDiff(new Date(tripDate),new Date())
}

module.exports = {
    getWeatherURL
}

//Function to get the difference of 2 dates in days
// Both dates must be in a date format
function dayDiff(date1,date2){
    //Get just the dates.  Arguments should have times though to avoid UTC errors
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const toDays = 1000 * 60 * 60 * 24 //Use to divide the datetime numeric value to convert to days
    return Math.floor((d1-d2)/toDays);
}

