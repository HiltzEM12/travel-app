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

// Function to update the weather using the API results
function updateWeather(arr){
    const currentWeather = arr.current;
    const futureWeather = arr.forcast;
    //1st process the current weather
    if(currentWeather.length > 0){ // Only process if there's something in the array
        // //1st clear out the old list
        // currentWeatherDisp.innerHTML = '';

        // const docFrag = document.createDocumentFragment(); // Document frag to add to

        // //Add a div for each field
        // const temp = document.createElement('div'); // temperature div
        // temp.textContent = 'Current temperature:' + currentWeather[0].temp + ' F';
        // docFrag.appendChild(temp);

        // const feelsLike = document.createElement('div'); // feels like temp div
        // feelsLike.textContent = 'Feels like: ' + currentWeather[0].feelsLike + ' F';
        // docFrag.appendChild(feelsLike);

        // const windSpeed = document.createElement('div'); // wind speed div
        // windSpeed.textContent = 'Wind speed: '+ currentWeather[0].windSpd + ' mph';
        // docFrag.appendChild(windSpeed);

        // const clouds = document.createElement('div'); // cloud cover percent div
        // clouds.textContent = 'Cloud cover: ' + currentWeather[0].clouds + '%';
        // docFrag.appendChild(clouds);

        // const desc = document.createElement('div'); // general description div
        // desc.textContent = 'Current condition: ' + currentWeather[0].desc;
        // docFrag.appendChild(desc);

        // //Add the divs created above to the document
        // currentWeatherDisp.appendChild(docFrag);

    }

    //Then process each of the forcast days
    if(futureWeather.length > 0){
        
    }
}

export { 
    updatePlaceDD,
    placeButtonClick,
    travelButtonClick,
    setDates,
    updateWeather
};