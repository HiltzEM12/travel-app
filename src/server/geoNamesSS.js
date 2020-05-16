// function testFunc(){
//     console.log('Test function worked')
// };


// Function to process the array of results from the API call
// Only goes through the 1st 15 or until the end of the list
// Only selects the 1st distinct name (i.e. if there are 2 Charleston, SC, then only the 1st one is used)
// Use these to update the dropdown
async function processGeoRes(res){
    const maxL = 15; // Max loop iterations
    const placeDetails = []; // Array to store the place details
    // Go through the given array and create readable place names and get lat and lon
    for(let i = 0; i < res.length  && i < maxL; i++){
        let placeInfo = {}; //Object to store into the array
        let tempName = ''; //Use to create the place name string
        if('placeName' in res[i]){
            tempName = res[i].placeName;
            //console.log(res[i].placeName);
        }
        if('adminName1' in res[i]){
            tempName = tempName + ', ' + res[i].adminName1;
            //console.log(res[i].placeName);
        }
        if('countryCode' in res[i]){
            tempName = tempName + ', ' + res[i].countryCode;
            //console.log(res[i].placeName);
        }
        //Only add the name to the list if it isn't already there
        if(typeof (placeDetails.find(x => x.place == tempName)) === 'undefined'){
            let lat = res[i].lat;
            let lng = res[i].lng;
            placeDetails.push({place: tempName, lat: lat, lng: lng})
        }
    }
    //console.log(placeDetails)
    // Update the dropdown list for the user to choose
    return placeDetails;
}

module.exports = {
    // testFunc,
    processGeoRes
}