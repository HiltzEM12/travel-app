// JavaScript file for handling the objects returned from GeoNames.org

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
            Client.updatePlaceDD(res); //Send results to the DOM to update the dropdown
        })
    }
    catch(error){
        console.log('error in callGeoAPI: ', error)
    }
};

export { 
    getGeoAPIData
};
