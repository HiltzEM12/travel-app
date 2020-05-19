// JavaScript file for handling the objects returned from pixabay.com

// Function to get the data.
// Argument is a JSON string with search terms
async function getPicData(term){

    //Post to the server with the search term as an argument
    try{
    const res = await fetch('/pic', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'text' :term}),
        //body: JSON.stringify({'text': place}), // body data type must match 'Content-Type' header        
    })
    .then(res => res.json())
    .then(function(res){
        //console.log('UpdateWeather Call');
        //Client.updateWeather(res);
        console.log('getPicData', res)
    })
        //await console.log(fetch('/geo')))  //Process the json
    }
    catch(error){
        console.log('error in getPicData: ', error)
    }
};

export { 
    getPicData
};