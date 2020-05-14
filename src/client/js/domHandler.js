// Javasript file for handling the DOM

// Add listener to the get info button
document.getElementById('get-info').addEventListener('click', placeButtonClick);


// Function to handle what to do when the get-info button is clicked
function placeButtonClick(event) {
    Client.callGeoAPI();
};