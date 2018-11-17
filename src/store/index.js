import { combineReducers } from 'redux';
import LoginReducer from './Login/login-reducer';
import LocationReducer from './Location/location-reducer';
import SearchReducer from './Search/search-reducer';
import ExpandedRestaurantReducer from './ExpandedRestaurant/expanded-restaurant-reducer';

export default combineReducers({
    login: LoginReducer,
    location: LocationReducer,
    search: SearchReducer,
    restaurant: ExpandedRestaurantReducer,
});
