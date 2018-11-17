import {
    EXPANDED_RESTAURANT_REQUEST,
    EXPANDED_RESTAURANT_SUCCESS,
    EXPANDED_RESTAURANT_FAILURE,
} from './expanded-restaurant-types';

const INITIAL_STATE = {
    gettingExpandedRestaurant: null,
    restaurantCache: {},
};

const ExpandedRestaurantReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case EXPANDED_RESTAURANT_REQUEST:
            return {
                gettingExpandedRestaurant: true,
                ...state,
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
                    [payload.restaurantID]: payload,
                },
                gettingExpandedRestaurant: false,
            };
        default:
            return state;
    }
};

export default ExpandedRestaurantReducer;
