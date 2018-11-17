import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SET_ACTIVE_RESTAURANT,
} from './search-types';

const INITIAL_STATE = {
    gettingRestaurants: false,
    searchError: null,
    restaurantList: [],
    activeRestaurant: null,
    activeRestaurantLat: null,
    activeRestaurantLng: null,
};

const SearchReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                gettingRestaurants: true,
            };
        case SEARCH_FAILURE:
            return {
                ...state,
                searchError: payload,
                gettingRestaurants: false,
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                restaurantList: payload,
                gettingRestaurants: false,
            };
        case SET_ACTIVE_RESTAURANT: {
            const {
                restaurantId,
                restaurantLat,
                restaurantLng,
            } = payload;

            return {
                ...state,
                activeRestaurant: restaurantId,
                activeRestaurantLat: restaurantLat,
                activeRestaurantLng: restaurantLng,
            };
        }
        default:
            return state;
    }
};

export default SearchReducer;
