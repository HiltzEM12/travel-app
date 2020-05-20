// JavaScript file for handling the objects returned from weatehrbit.io

// Current weather div
const currentWeatherDisp = document.getElementById('current-weather'); //Chnage this when it goes live.  For testing only

// Function to get the data.
// Argument is an object with a lat, lon, and date
async function getWeatherBitData(txt){
    const docFrag = document.createDocumentFragment(); // Document frag to return
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
        updateWeather(res);
    })
        //await console.log(fetch('/geo')))  //Process the json
    }
    catch(error){
        console.log('error in getWeatherAPIData: ', error)
    }
    return docFrag;
};

// Function to update the weather using the API results
function updateWeather(arr){
    const currentWeather = arr.current;
    const futureWeather = arr.forcast;
    //console.log('forcast',arr.forcast)
    //1st process the current weather
    if(currentWeather.length > 0){ // Only process if there's something in the array
        // //1st clear out the old list
        // currentWeatherDisp.innerHTML = '';

        // const docFrag = document.createDocumentFragment(); // Document frag to add to

        // //Add a div for each field
        // const temp = document.createElement('div'); // temperature div
        // temp.textContent = 'Current temperature:' + currentWeather[0].temp + ' F';
        // docFrag.appendChild(temp);

        // const feelsLike = document.createElement('div'); // feels like temp div
        // feelsLike.textContent = 'Feels like: ' + currentWeather[0].feelsLike + ' F';
        // docFrag.appendChild(feelsLike);

        // const windSpeed = document.createElement('div'); // wind speed div
        // windSpeed.textContent = 'Wind speed: '+ currentWeather[0].windSpd + ' mph';
        // docFrag.appendChild(windSpeed);

        // const clouds = document.createElement('div'); // cloud cover percent div
        // clouds.textContent = 'Cloud cover: ' + currentWeather[0].clouds + '%';
        // docFrag.appendChild(clouds);

        // const desc = document.createElement('div'); // general description div
        // desc.textContent = 'Current condition: ' + currentWeather[0].desc;
        // docFrag.appendChild(desc);

        // //Add the divs created above to the document
        // currentWeatherDisp.appendChild(docFrag);

    }

    //Then process each of the forcast days
    if(futureWeather.length > 0){
        
    }
}

export { 
    getWeatherBitData
};