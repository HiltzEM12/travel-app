// JavaScript file for handling the objects returned from weatehrbit.io

// Current weather div
const currentWeatherDisp = document.getElementById('current-weather'); //Chnage this when it goes live.  For testing only

// Function to get the data.
// Argument is an object with a lat, lon, and date
async function getWeatherBitData(txt){
    let docFrag = document.createDocumentFragment(); // Document frag to return
    console.log('2 in getWeatherBitData',txt);
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
    console.log('3 in processWeather',arr);
    let docFrag = document.createDocumentFragment(); // Document frag to return

    const currentWeather = arr.current;
    const futureWeather = arr.forcast;

    //1st process the current weather
    if(currentWeather.length > 0){ // Only process if there's something in the array
        let cw = await createCurrentFrag(currentWeather);
        docFrag.appendChild(cw);
    }

    //Then process each of the forcast days
    if(futureWeather.length > 0){
        let fw = await createForcastFrag(futureWeather);
        docFrag.appendChild(fw);
        
    }
    console.log(docFrag);
    return docFrag;
}

//Creates document frag to use to add the current weather to the trip card
async function createCurrentFrag(arr){

    let docFrag = document.createDocumentFragment(); // Document frag to add to
    console.log('in createCurrentFrag');
    // //Add a div for each field
    const temp = document.createElement('div'); // temperature div
    temp.textContent = 'Current temperature:' + arr[0].temp + ' F';
    docFrag.appendChild(temp);

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

    return docFrag;

};

//Creates document frag to use to add the forcast weather to the trip card
// Only adds 3 days max to save space
async function createForcastFrag(arr){
    console.log('in createForcastFrag');
    let docFrag = document.createDocumentFragment(); // Document frag to add to

    const temp = document.createElement('div'); // temperature div
    temp.textContent = 'Forecast';
    docFrag.appendChild(temp);

    return docFrag;
}
export { 
    getWeatherBitData
};