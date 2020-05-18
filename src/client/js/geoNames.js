// JavaScript file for handling the objects returned from GeoNames.org

// // url to use to get the lat/lon from geonames.org using a city or other named place
// const geoURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';

// // Get user ID to use for the GeoNames API
// const geoUID  = 'HiltzEM12'

// //Post rout for getting the lat/lon from a zip code
// app.post('/geo', function (req, res) {
//     console.log('In POST for geo', geoUID);
//     place = req.body.text;
//     apiURL = geoURL+ place + '&username=' + geoUID;
//     res.send(callGeoAPI(apiURL));
// });

async function getGeoAPIData(place){

    // callAPI(place)
    // .then(console.log(getData()))

    //Post to the server with the sentence as an argument
    try{
    const res = await fetch('/geo', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'text': place}), // body data type must match 'Content-Type' header        
    })
    //.then(fetch('/geo'))
    .then(res => res.json())
    .then(function(res){
        //console.log(res);
        Client.updatePlaceDD(res);
    })
        //await console.log(fetch('/geo')))  //Process the json
    }
    catch(error){
        console.log('error in callGeoAPI: ', error)
    }
};

// async function callAPI(place){
//     await fetch('/geo', {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({'text': place}), // body data type must match 'Content-Type' header        
//     })
// }


// async function getData(){
//     const ret =  await fetch('/geo');
//     return ret;
// }


// url to use to get the lat/lon from geonames.org using a city or other named place
// const geoURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';

// async function callGeoAPI(place) {
//     //console.log('In callGeoAPI');
//     const UID = await fetch('/geo')
//     console.log(UID)
//     const apiURL = geoURL + place + '&username=' + UID;
    
//     try {
//         // Call the GEO API
//         const request = await fetch(apiURL)
//         .then(res => res.json())  //Process the json
//         .then(function(res) { // Use the lat lon info
//             // make sure at least one result was returned
//             if('postalCodes' in res && res.postalCodes.length > 0){
//                 processGeoRes(res.postalCodes);
//                 //console.log(JSON.stringify(res))  //Use to get json example
//             }
//         });
//     } catch (error) {
//         console.log('error in callGeoAPI', error);
//     }
// };


// Function to process the array of results from the API call
// Only goes through the 1st 15 or until the end of the list
// Only selects the 1st distinct name (i.e. if there are 2 Charleston, SC, then only the 1st one is used)
// Use these to update the dropdown
// async function processGeoRes(res){
//     const maxL = 15; // Max loop iterations
//     const placeDetails = []; // Array to store the place details
//     // Go through the given array and create readable place names and get lat and lon
//     for(let i = 0; i < res.length  && i < maxL; i++){
//         let placeInfo = {}; //Object to store into the array
//         let tempName = ''; //Use to create the place name string
//         if('placeName' in res[i]){
//             tempName = res[i].placeName;
//             //console.log(res[i].placeName);
//         }
//         if('adminName1' in res[i]){
//             tempName = tempName + ', ' + res[i].adminName1;
//             //console.log(res[i].placeName);
//         }
//         if('countryCode' in res[i]){
//             tempName = tempName + ', ' + res[i].countryCode;
//             //console.log(res[i].placeName);
//         }
//         //Only add the name to the list if it isn't already there
//         if(typeof (placeDetails.find(x => x.place == tempName)) === 'undefined'){
//             let lat = res[i].lat;
//             let lng = res[i].lng;
//             placeDetails.push({place: tempName, lat: lat, lng: lng})
//         }
//     }
//     //console.log(placeDetails)
//     // Update the dropdown list for the user to choose
//     await Client.updatePlaceDD(placeDetails);
// }

// async function getGeoUserID(){
//     const request = await fetch('/geo');
//     try {
//         const newData = await request.json(); // Get the JSON from the server
//         // Set the divs
//         console.log(request);
//         console.log(newData);
//         console.log(newData.uid);
//     } catch (error) {
//         console.log('error', error);
//     }

// }

export { 
    getGeoAPIData
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


