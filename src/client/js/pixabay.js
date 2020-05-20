// JavaScript file for handling the objects returned from pixabay.com

// const picBox = document.getElementById("test-pic");  //Chnage this when it goes live.  For testing only

// Place dropdown
const placeDD = document.getElementById('place-dropdown');

// Function to get the data.
// Argument is a JSON string with search terms
async function getPicData(term){
    let docFrag = document.createDocumentFragment(); // Document frag to return
    //Post to the server with the search term as an argument
    try{
    //console.log('Fetch pic url')
    let res = await fetch('/pic', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'text' :term}),
        //body: JSON.stringify({'text': place}), // body data type must match 'Content-Type' header        
    })
    //.then(res => res.json())
    res = await res.json();
    //.then(async function(res){
        //console.log('UpdateWeather Call');
        //Client.updateWeather(res);
        //console.log('getPicData', res)
        //console.log('2 await processPicUrl',docFrag)
    docFrag = await processPicUrl(res);
        //console.log('4 return processPicUrl',docFrag)
    //})
        //await console.log(fetch('/geo')))  //Process the json
    }
    catch(error){
        console.log('error in getPicData: ', error)
    }
    
    return docFrag;
};


async function processPicUrl(url){
    //console.log('in process Pic URL',url)
    //Example
    // <figure>
    //     <figcaption class='holder'>place name</figcaption>
    //     <img src='https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&w=1000&q=80' alt='place name' class='trip-pic'>
    // </figure>
    let docFrag = document.createDocumentFragment(); // Document frag to add to
    if(url){ //Make sure there was a url given

        //picBox.innerHTML = '';  //Clear out old.  Only needed in testin

        const place = placeDD.options[placeDD.selectedIndex].text;

        const fig = document.createElement('figure');
        const figCap = document.createElement('figureCaption');
        figCap.classList.add('holder');
        figCap.textContent = `Trip to: ${place}`;
        fig.appendChild(figCap);
        const img = document.createElement('img');
        img.classList.add('trip-pic');
        img.alt = place;
        img.src = url;
        fig.appendChild(img);
        docFrag.appendChild(fig);
        //picBox.appendChild(docFrag);
        //console.log('3 createDocumentFragment docFrag',docFrag)
    }
    return docFrag;
}

export { 
    getPicData
};