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

        try{
            //Get the picture info.  Returns doc frag
            let picDocFrag = await Client.getPicData({
                displayName: placeDetails.textContent,
                adminName1: placeDetails.adminName1,
                countryName: placeDetails.countryName,
                name: placeDetails.name
            });

            //console.log('1 await Client.getWeatherBitData')
            //Get the weather info.  Returns doc frag
            let weatherDocFrag = await Client.getWeatherBitData({
                date: departure.value +'T00:00' , //Added the time to the date to avoid UTC issues
                lat: placeDetails.lat,
                lng: placeDetails.lng
            });

            //Using the above doc frags, add the trip card
            createTripBox(picDocFrag, weatherDocFrag);

        }
        catch(error){
        }

        // Clear out user input fields
        clearFields();
    }
    else{
        alert('Enter a place and a date')
    }
};

//Div where to add the trip cards
const tripGrid = document.getElementById('trip-grid-div');

// Function to create the trip box docfrag to add to the document
// Arguments are the weather and picture html to add
async function createTripBox(picDocFrag, weatherDocFrag){

    const docFrag = document.createDocumentFragment(); //Docfrag to add to then append to the doc
    const mainDiv = document.createElement('div'); //Main trip box div
    mainDiv.classList.add('trip-box');
    mainDiv.classList.add('holder');
    mainDiv.appendChild(picDocFrag); //Add the picture

    let departFrag = await createDepartureFrag();
    mainDiv.appendChild(departFrag); //Add the departure date

    mainDiv.appendChild(weatherDocFrag);//Add the weather

    // Add the main div of the card to the docFrag to add
    docFrag.appendChild(mainDiv);

    // Add to the document
    tripGrid.appendChild(docFrag);

};

//Creates a doc frag to display the departure date
async function createDepartureFrag(){
    const docFrag = document.createDocumentFragment(); //Docfrag to add to then append to the doc
    const mainDiv = document.createElement('div'); //Main trip box div
    mainDiv.classList.add('travel-date');
    let departureDate = dateFormat(departure.value, 'fullDate');
    mainDiv.textContent = 'Departure Date: ' + departureDate;

    //Add the delete button next to the date
    let removeButtonFrag = await createRemoveFrag();
    mainDiv.appendChild(removeButtonFrag);//Add a trip remove button

    docFrag.appendChild(mainDiv);
    return docFrag;
};

//Creates the remove button
async function createRemoveFrag(){
    const docFrag = document.createDocumentFragment(); //Docfrag to add to then append to the doc
    //mainDiv.classList.add('holder');
    const button = document.createElement('button'); //Button
    button.type = 'submit';
    button.id = 'delete-trip-button';
    button.textContent = 'Remove Trip';
    await addRemoveListener(button);
    //mainDiv.appendChild(button);
    docFrag.appendChild(button);
    return docFrag;
}

//Adds listener to the remove button
async function addRemoveListener(button){
    button.addEventListener('click',removeTripBox);
}

// Add listener to the place search button
document.getElementById('search-place-button').addEventListener('click', placeButtonClick);

// Clears out the user input fields to prepare for another trip
function clearFields(){
    placeDD.innerHTML = '';
    placeNameField.value = '';
    departure.value = '';
};

//Removes the trip card
function removeTripBox(event){
    let elem = event.target;

    //Move up the nodes until the head is reached, or the trip box is reached
    while((!(elem.classList.contains('trip-box')) && elem.tagName != 'BODY')){
        elem = elem.parentNode;
    }
    // Delete if the element contians the trip-box class
    // Otherwise do nothing since the head was reached
    if(elem.classList.contains('trip-box')){
        elem.parentNode.removeChild(elem);
    }
}


export { 
    setDates
};

