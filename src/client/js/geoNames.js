// JavaScript file for handling the objects returned from GeoNames.org

// Place dropdown
const placeDD = document.getElementById('place-dropdown');

// Function to call the geoAPI and get the geo data
async function getGeoAPIData(place){
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
        .then(res => res.json())
        .then(function(res){
            //console.log(res);
            if (res.length > 0 ){ //Only proceed if results were returned
                updatePlaceDD(res); //Process the results
            }
            else{
                alert('No results found for ' + place)
            }
        })
    }
    catch(error){
        console.log('error in callGeoAPI: ', error)
    }
};

// Add an array of place names to the place drop down
// Argument should be an array of objects
async function updatePlaceDD(arr){

    //1st clear out the old list
    placeDD.innerHTML = '';
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
};

export { 
    getGeoAPIData
};
