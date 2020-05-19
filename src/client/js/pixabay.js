// JavaScript file for handling the objects returned from pixabay.com

const picBox = document.getElementById("test-pic");  //Chnage this when it goes live.  For testing only

// Function to get the data.
// Argument is a JSON string with search terms
async function getPicData(term){
    //console.log('in getPicData')
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
        //console.log('getPicData', res)
        processPicUrl(res);
    })
        //await console.log(fetch('/geo')))  //Process the json
    }
    catch(error){
        console.log('error in getPicData: ', error)
    }
};


function processPicUrl(url){
    console.log('in process Pic URL',url)
    //Example
    // <figure>
    //     <figcaption class='holder'>place name</figcaption>
    //     <img src='https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&w=1000&q=80' alt='place name' class='trip-pic'>
    // </figure>
    if(url){ //Make sure there was a url given

        //picBox.innerHTML = '';  //Clear out old.  Only needed in testin

        const docFrag = document.createDocumentFragment(); // Document frag to add to

        const fig = document.createElement('figure');
        const figCap = document.createElement('figureCaption');
        figCap.classList.add('holder');
        figCap.textContent = 'test place'
        fig.appendChild(figCap);
        const img = document.createElement('img');
        img.classList.add('trip-pic');
        img.alt = 'test place';
        img.src = url;
        fig.appendChild(img);
        docFrag.appendChild(fig);
        picBox.appendChild(docFrag);

    }
}







export { 
    getPicData
};