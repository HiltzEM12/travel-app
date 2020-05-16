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

    const docFrag = document.createDocumentFragment(); // Document frag to add to
    arr.sort((x,y) => (x.place > y.place) ? 1 : -1); // Sort the array by place name 

    for (let i = 0; i < arr.length; i++) {
        const opItem = document.createElement('option'); // Create the new option
        opItem.value = '{ lat: ' + arr[i].lat +', lng: ' + arr[i].lng + '}'; // Add the lat lon as the values
        opItem.textContent = arr[i].place;  // Add the place name as the text
        docFrag.appendChild(opItem); // Add the item to the doc frag
    }

    placeDD.appendChild(docFrag);
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
    //Search for a place and let the user selct from the results
    console.log('latlon',placeDD.value)
    console.log('date',departure.value)
};


export { 
    updatePlaceDD,
    placeButtonClick,
    travelButtonClick,
    setDates
};