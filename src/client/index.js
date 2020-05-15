// Import needed functions
import { callGeoAPI } from './js/geoNames'
import { placeButtonClick } from './js/domHandler'
import { updatePlaceDD } from './js/domHandler'
import { setDates } from './js/domHandler'
import { travelButtonClick } from './js/domHandler'

//Import css (SASS in this case) files
import './styles/style.scss'

//Export functions to use
export {
    placeButtonClick,
    callGeoAPI,
    updatePlaceDD,
    setDates,
    travelButtonClick
}
