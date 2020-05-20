// JavaScript file for handling the objects returned from pixabay.com

// Place dropdown
const placeDD = document.getElementById('place-dropdown');

// Function to get the data.
// Argument is a JSON string with search terms
async function getPicData(term) {
    let docFrag = document.createDocumentFragment(); // Document frag to return
    //Post to the server with the search term as an argument
    try {
        let res = await fetch('/pic', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'text': term
            }),
        })

        res = await res.json();

        docFrag = await processPicUrl(res);
    } catch (error) {
        console.log('error in getPicData: ', error)
    }

    return docFrag;
};

//Creates the html to add to the trip card
async function processPicUrl(url) {
    let docFrag = document.createDocumentFragment(); // Document frag to add to
    if (url) { //Make sure there was a url given

        const place = placeDD.options[placeDD.selectedIndex].text;

        //Create html chunck to add to the card
        const fig = document.createElement('figure');
        const figCap = document.createElement('figureCaption');
        figCap.textContent = `Trip to: ${place}`;
        fig.appendChild(figCap);
        const img = document.createElement('img');
        img.classList.add('trip-pic');
        img.alt = place;
        img.src = url;
        fig.appendChild(img);
        docFrag.appendChild(fig);
    }
    return docFrag;
}

export {
    getPicData
};