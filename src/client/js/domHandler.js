// Javasript file for handling the DOM

// Use for formatting dates
const dateFormat = require('dateformat');

// Add listener to the place search button
document.getElementById('search-place-button').addEventListener('click', placeButtonClick);

// Place field
const placeNameField = document.getElementById('place-search-txt');

// Place dropdown
const placeDD = document.getElementById('place-dropdown');

// Depearture date picker
const departure = document.getElementById('departure');

// Add listener to the place search button
document.getElementById('get-travel-info').addEventListener('click', travelButtonClick);

// Current weather div
const currentWeatherDisp = document.getElementById('current-weather');


// Function to handle what to do when the place search button is clicked
function placeButtonClick(event) {
    //Search for a place and let the user selct from the results
    Client.getGeoAPIData(placeNameField.value);
};

// Add an array of place names to the place drop down
// Argument should be an array of objects
async function updatePlaceDD(arr){

    //1st clear out the old list
    placeDD.innerHTML = '';
    if(arr.length > 0){ // Only process if there's something in the array
        const docFrag = document.createDocumentFragment(); // Document frag to add to
        arr.sort((x,y) => (x.displayName > y.displayName) ? 1 : -1); // Sort the array by place name 

        for (let i = 0; i < arr.length; i++) {
            const opItem = document.createElement('option'); // Create the new option
            opItem.value = '{ "lat": ' + arr[i].lat 
                            +', "lng": ' + arr[i].lng 
                            +', "adminName1": "' + arr[i].adminName1 
                            +'", "countryName": "' + arr[i].countryName 
                            +'", "name": "' + arr[i].name 
                            + '"}'; // Add the values in a json string
            opItem.textContent = arr[i].displayName;  // Add the place name as the text
            docFrag.appendChild(opItem); // Add the item to the doc frag
        }
        placeDD.appendChild(docFrag);
    }    
};

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
function travelButtonClick(event) {
    //console.log('travelButtonClick')
    if( placeDD.value && departure.value){
        //Split out the lat lon JSON
        //console.log('latlon',placeDD.value)
        const placeDetails = JSON.parse(placeDD.value);
        //console.log('latlon',latLng)

        Client.getForcastData({
            date: departure.value +'T00:00' , //Added the time to the date to avoid UTC issues
            lat: placeDetails.lat,
            lng: placeDetails.lng
        })
        // console.log('latlon',placeDD.value)
        // console.log('date',departure.value)

        //Get a picture of the place and process it
        Client.getPicData({
            adminName1: placeDetails.adminName1,
            countryName: placeDetails.countryName,
            name: placeDetails.name
         })
    }
    else{
        alert('Enter a place and a date')
    }
};

export { 
    updatePlaceDD,
    placeButtonClick,
    travelButtonClick,
    setDates
};