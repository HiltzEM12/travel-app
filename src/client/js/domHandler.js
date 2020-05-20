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
        try{
            //console.log('1 await Client.getPicData');
            let picDocFrag = await Client.getPicData({
                displayName: placeDetails.textContent,
                adminName1: placeDetails.adminName1,
                countryName: placeDetails.countryName,
                name: placeDetails.name
            });

            let weatherDocFrag = await Client.getWeatherBitData({
                date: departure.value +'T00:00' , //Added the time to the date to avoid UTC issues
                lat: placeDetails.lat,
                lng: placeDetails.lng
            });

            createTripBox(picDocFrag, weatherDocFrag);
            //.then(res => res)
            //.then(console.log('5 GetPicData Called'))
            //console.log('5 GetPicData Called',x)
        }
        catch(error){
            //console.log('Error in travelButtonClick',error)
        }
        // .then(async function(res){
            //console.log('picDocFrag',picDocFrag.classList);
            //console.log('5 GetPicData Called',temp);
            //createTripBox(temp, null);
            // const weatherDocFrag = await Client.getWeatherBitData({
            //     date: departure.value +'T00:00' , //Added the time to the date to avoid UTC issues
            //     lat: placeDetails.lat,
            //     lng: placeDetails.lng
            // })
            // .then(async function(weatherDocFrag, picDocFrag){
            //     createTripBox(picDocFrag, weatherDocFrag);
            // })
        // })

        //console.log(picDocFrag);
        //picBox.appendChild(picDocFrag);

        //Get current weather data and forcast of the place and process it
        //Returns a docFrag that will be added to the document
        // const weatherDocFrag = await  Client.getWeatherBitData({
        //     date: departure.value +'T00:00' , //Added the time to the date to avoid UTC issues
        //     lat: placeDetails.lat,
        //     lng: placeDetails.lng
        // })
        // console.log('latlon',placeDD.value)
        // console.log('date',departure.value)

        //Create trip doc frag and add it
        // createTripBox(picDocFrag, weatherDocFrag);
        //Clear out the data fields to prepare for another trip
        clearFields();
    }
    else{
        alert('Enter a place and a date')
    }
};

//Div where to add the trip cards
const tripGrid = document.getElementById('trip-grid-div');

// Function to create the trip box docfrag to add to the document
function createTripBox(picDocFrag, weatherDocFrag){
    //tripGrid.appendChild(picDocFrag)
    const docFrag = document.createDocumentFragment(); //Docfrag to add to then append to the doc
    const mainDiv = document.createElement('div'); //Main trip box div
    mainDiv.classList.add('trip-box');
    mainDiv.appendChild(picDocFrag); //Add the picture

    docFrag.appendChild(mainDiv);

    tripGrid.appendChild(docFrag);

}

export { 
    setDates
};

// Clears out the user input fields to prepare for another trip
function clearFields(){
    placeDD.innerHTML = '';
    placeNameField.value = '';
    departure.value = '';
}
