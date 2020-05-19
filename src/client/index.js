// Import needed functions
import { getGeoAPIData } from './js/geoNames';
import { getForcastData } from './js/weatherBit';
import { getPicData } from './js/pixabay';
import { placeButtonClick } from './js/domHandler';
import { updatePlaceDD } from './js/domHandler';
import { setDates } from './js/domHandler';
import { travelButtonClick } from './js/domHandler';
import { updateWeather } from './js/domHandler';
//import { cityTest } from './media/testCity.jpg';

//Import css (SASS in this case) files
import './styles/style.scss'

//Export functions to use
export {
    placeButtonClick,
    getGeoAPIData,
    updatePlaceDD,
    setDates,
    travelButtonClick,
    getForcastData,
    updateWeather,
    getPicData
}


// function testImage() {
//     const picElement = document.createElement('figure')
//     picElement.classList.add('trip-pic');

//     // Add the image to our existing div.
//     const myIcon = new Image();
//     myIcon.src = cityTest;

//     picElement.appendChild(myIcon);

//     const trip = document.getElementsByClassName('trip-flex');
//     for(let i = 0; i < trip.length; i++){
//         trip[0].appendChild(picElement);
//     }

//   }

//   testImage();
