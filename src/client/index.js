// Import needed functions
import { getGeoAPIData } from './js/geoNames'
import { getForcastData } from './js/weatherBit'
import { placeButtonClick } from './js/domHandler'
import { updatePlaceDD } from './js/domHandler'
import { setDates } from './js/domHandler'
import { travelButtonClick } from './js/domHandler'

//Import css (SASS in this case) files
import './styles/style.scss'

//Export functions to use
export {
    placeButtonClick,
    getGeoAPIData,
    updatePlaceDD,
    setDates,
    travelButtonClick,
    getForcastData
}
