// Javasript file for handling the DOM

//const picBox = document.getElementById("test-pic");  //Chnage this when it goes live.  For testing only

// Use for formatting dates
const dateFormat = require('dateformat');

// Place dropdown
const placeDD = document.getElementById('place-dropdown');


// Place field
const placeNameField = document.getElementById('place-search-txt');

// Add listener to the place search button
document.getElementById('search-place-button').addEventListener('click', placeButtonClick);

// Function to handle what to do when the place search button is clicked
function placeButtonClick(event) {
    //Search for a place and let the user selct from the results
    Client.getGeoAPIData(placeNameField.value);
};

// Depearture date picker
const departure = document.getElementById('departure');

// Add listener to the place search button
document.getElementById('get-travel-info').addEventListener('click', travelButtonClick);

//Sets the min and max dates for the departure date clicker
function setDates(){
    const yrOffset = 2;  // Max date years from now
    const today = new Date();
    const todayYr = today.getFullYear();
    const todayMo = today.getMonth();
    const todayDay = today.getDate();
    const maxDate = new Date(todayYr + yrOffset, todayMo, todayDay);
    departure.setAttribute('min', dateFormat(today, 'yyyy-mm-dd'));
    departure.setAttribute('max', dateFormat(maxDate, 'yyyy-mm-dd'));
};

// Function to handle what to do when the get travel info button is clicked
async function travelButtonClick(event) {
    //console.log('travelButtonClick')
    if( placeDD.value && departure.value){
        //Get place details from the dropdown
        const placeDetails = JSON.parse(placeDD.value);

        //Get a picture of the place and process it
        //Returns a docFrag that will be added to the document
        const picDocFrag = await  Client.getPicData({
            displayName: placeDetails.textContent,
            adminName1: placeDetails.adminName1,
            countryName: placeDetails.countryName,
            name: placeDetails.name
        })

        //console.log(picDocFrag);
        //picBox.appendChild(picDocFrag);

        //Get current weather data and forcast of the place and process it
        //Returns a docFrag that will be added to the document
        Client.getWeatherBitData({
            date: departure.value +'T00:00' , //Added the time to the date to avoid UTC issues
            lat: placeDetails.lat,
            lng: placeDetails.lng
        })
        // console.log('latlon',placeDD.value)
        // console.log('date',departure.value)
    }
    else{
        alert('Enter a place and a date')
    }
};

export { 
    setDates
};