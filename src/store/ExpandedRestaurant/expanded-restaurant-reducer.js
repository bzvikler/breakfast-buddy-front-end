import {
    EXPANDED_RESTAURANT_REQUEST,
    EXPANDED_RESTAURANT_SUCCESS,
    EXPANDED_RESTAURANT_FAILURE,
    FAVOURITE_RESTAURANT_REQUEST,
    FAVOURITE_RESTAURANT_FAILURE,
    FAVOURITE_RESTAURANT_SUCCESS,
} from './expanded-restaurant-types';

const INITIAL_STATE = {
    gettingExpandedRestaurant: null,
    favouritingRestaurant: null,
    restaurantCache: {},
};

const ExpandedRestaurantReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case EXPANDED_RESTAURANT_REQUEST:
            return {
                ...state,
                gettingExpandedRestaurant: true,
            };
        case EXPANDED_RESTAURANT_FAILURE:
            return {
                ...state,
                gettingExpandedRestaurant: false,
            };
        case EXPANDED_RESTAURANT_SUCCESS:
            return {
                ...state,
                restaurantCache: {
                    ...state.restaurantCache,
                    [payload.restaurantID.trim()]: payload,
                },
                gettingExpandedRestaurant: false,
            };
        case FAVOURITE_RESTAURANT_REQUEST:
            return {
                ...state,
                favouritingRestaurant: true,
            };
        case FAVOURITE_RESTAURANT_FAILURE:
            return {
                ...state,
                favouritingRestaurant: false,
            };
        case FAVOURITE_RESTAURANT_SUCCESS:
            return {
                ...state,
                favouritingRestaurant: false,
            };
        default:
            return state;
    }
};

export default ExpandedRestaurantReducer;
