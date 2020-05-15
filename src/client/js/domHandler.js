// Javasript file for handling the DOM

// Add listener to the get info button
document.getElementById('get-info').addEventListener('click', placeButtonClick);

// Place field
const placeNameField = document.getElementById('place');


// Function to handle what to do when the get-info button is clicked
function placeButtonClick(event) {
    //Update the place name display
    Client.callGeoAPI(placeNameField.value);

    // Clear out the search field
};