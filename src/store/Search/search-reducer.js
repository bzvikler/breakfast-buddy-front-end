import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
} from './search-types';

const INITIAL_STATE = {
    gettingRestaurants: false,
    searchError: null,
    restaurantList: [],
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
        default:
            return state;
    }
};

export default SearchReducer;