// JavaScript file for handling the objects returned from GeoNames.org

// Place dropdown
const placeDD = document.getElementById('place-dropdown');

// // Place field
// const placeNameField = document.getElementById('place-search-txt');

// // Add listener to the place search button
// document.getElementById('search-place-button').addEventListener('click', placeButtonClick);

// // Function to handle what to do when the place search button is clicked
// function placeButtonClick(event) {
//     //Search for a place and let the user selct from the results
//     getGeoAPIData(placeNameField.value);
// };

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
            updatePlaceDD(res); //Send results to the DOM to update the dropdown
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

export { 
    getGeoAPIData
};
