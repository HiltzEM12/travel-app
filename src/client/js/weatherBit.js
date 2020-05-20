// JavaScript file for handling the objects returned from weatehrbit.io

// Use for formatting dates
const dateFormat = require('dateformat');

// Function to get the data.
// Argument is an object with a lat, lon, and date
async function getWeatherBitData(txt){
    let docFrag = document.createDocumentFragment(); // Document frag to return
    //console.log('2 in getWeatherBitData',txt);
    //Post to the server with the sentence as an argument
    try{
    let res = await fetch('/weather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'text' :txt}),
        //body: JSON.stringify({'text': place}), // body data type must match 'Content-Type' header        
        })

        res = await  res.json();

        docFrag = await processWeather(res);
    }
    catch(error){
        console.log('error in getWeatherBitData: ', error)
    }
    return docFrag;
};

// Function to update the weather using the API results
async function processWeather(arr){
    //console.log('3 in processWeather',arr);
    let docFrag = document.createDocumentFragment(); // Document frag to return

    const currentWeather = arr.current;
    const futureWeather = arr.forcast;

    //1st process the current weather
    if(currentWeather.length > 0){ // Only process if there's something in the array
        let cw = await createCurrentFrag(currentWeather);
        docFrag.appendChild(cw);
    }

    //Then process each of the forcast days
    if(futureWeather[0].length > 0){
        let fw = await createForcastFrag(futureWeather);
        docFrag.appendChild(fw);
    }
    //console.log(docFrag);
    return docFrag;
}

//Creates document frag to use to add the current weather to the trip card
async function createCurrentFrag(arr){

    let docFrag = document.createDocumentFragment(); // Document frag to add to
    //console.log('in createCurrentFrag');
    // //Add a div for each field
    const cur = document.createElement('div'); // temperature div
    cur.textContent = 'Current Weather: feels like ' + arr[0].temp + ' °F with ' + arr[0].desc.toLowerCase();
    docFrag.appendChild(cur);

    return docFrag;

};

//Creates document frag to use to add the forcast weather to the trip card
// Only adds 3 days max to save space
async function createForcastFrag(arr){
    //console.log('in createForcastFrag');
    let docFrag = document.createDocumentFragment(); // Document frag to add to
    //console.log(arr)
    let fLength = arr[0].length;  //Forcast day length
    //console.log(arr)
    const head = document.createElement('div'); // forcase header div
    const forcastBox = document.createElement('div'); // forcase header div
    head.textContent = fLength + '-Day Forecast';
    forcastBox.classList.add('forecast-weather-container');
    for(let i = 0; i < arr[0].length; i++){
        //let forcast = await createforcastBox(arr[0][i]);
        let forcast = await createforcastBox(arr[0][i]);
        forcastBox.appendChild(forcast);
    }
    head.appendChild(forcastBox);
    docFrag.appendChild(head);
    return docFrag;
}

// Creates the box to use to add to the forcast section
async function createforcastBox(txt){
    let docFrag = document.createDocumentFragment(); // Document frag to add to
    const forcast = document.createElement('div'); // forcast div
    forcast.classList.add('forecast-weather-box');
    const fDate = document.createElement('div');
    fDate.textContent = dateFormat(txt.weatherDate,'mmm dd yyyy');
    const tempHigh = document.createElement('div');
    tempHigh.textContent = 'High: ' + txt.maxTemp + '°F';
    const tempLow = document.createElement('div');
    tempLow.textContent = 'Low: ' + txt.minTemp + '°F';
    const rain = document.createElement('div');
    rain.textContent = txt.precip + '% rain';
    const desc = document.createElement('div');
    desc.textContent = txt.desc;
    forcast.appendChild(fDate);
    forcast.appendChild(tempHigh);
    forcast.appendChild(tempLow);
    forcast.appendChild(rain);
    forcast.appendChild(desc);
    docFrag.appendChild(forcast);
    return docFrag;
}

export { 
    getWeatherBitData
};