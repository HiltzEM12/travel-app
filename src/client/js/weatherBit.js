// JavaScript file for handling the objects returned from weatehrbit.io

// Function to get the data.
// Argument is an object with a lat, lon, and date
async function getForcastData(txt){

    //console.log('in getWeatherAPIData',txt);
    //Post to the server with the sentence as an argument
    try{
    const res = await fetch('/weather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'text' :txt}),
        //body: JSON.stringify({'text': place}), // body data type must match 'Content-Type' header        
    })
    .then(res => res.json())
    .then(function(res){
        //console.log('UpdateWeather Call');
        Client.updateWeather(res);
    })
        //await console.log(fetch('/geo')))  //Process the json
    }
    catch(error){
        console.log('error in getWeatherAPIData: ', error)
    }
};

export { 
    getForcastData
};