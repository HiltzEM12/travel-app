// JavaScript file for handling the objects returned from GeoNames.org

// url to use to get the lat/lon from geonames.org using a city or other named place
const geoURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';

// Get user ID to use for the GeoNames API
const geoUID  = 'HiltzEM12'

// Place field
const placeNameField = document.getElementById('place');


// //Post rout for getting the lat/lon from a zip code
// app.post('/geo', function (req, res) {
//     console.log('In POST for geo', geoUID);
//     place = req.body.text;
//     apiURL = geoURL+ place + '&username=' + geoUID;
//     res.send(callGeoAPI(apiURL));
// });

// Function for handling the API call to the geo site
async function callGeoAPI() {
    console.log('In callGeoAPI');

    // Create url to use
    const place = placeNameField.value
    const apiURL = geoURL + place + '&username=' + geoUID;
    // Call the GEO API
    const request = await fetch(apiURL)
    .then(res => res.json())  //Process the json
    .then(function(res) { // Use the lat lon info
        console.log(res.postalCodes[0])
    });

    //console.log('go fetch response: ', request.status);

    // Throw an error on a 404
    //if (request.status !== 400) throw new Error('Invalid place name or cannot return data');

    try {
        return data;
    } catch (error) {
        console.log('error in callGeoAPI', error);
    }
};




// // Function to post to the server and get back the data from the API
// // Call located on the server so the user ID is not shared
// async function getLatLon(){
//     const place = placeNameField.value;
//     fetch('http://localhost:3000/geo', {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({'text': place}), // body data type must match 'Content-Type' header        
//     })
//     .then(res => res.json())  //Process the json
//     .then(function(res) { // Use the lat lon info
//         console.log(res.postalCodes);
//     })
// };


export { 
    callGeoAPI
};