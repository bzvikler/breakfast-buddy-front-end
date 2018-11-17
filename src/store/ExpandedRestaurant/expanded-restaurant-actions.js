import {
    EXPANDED_RESTAURANT_REQUEST,
    EXPANDED_RESTAURANT_SUCCESS,
    EXPANDED_RESTAURANT_FAILURE,
} from './expanded-restaurant-types';

const expandedRestaurantSuccess = restaurant => ({
    type: EXPANDED_RESTAURANT_SUCCESS,
    payload: restaurant,
});
const expandedRestaurantFailure = error => ({
    type: EXPANDED_RESTAURANT_FAILURE,
    payload: error,
});

export const asyncGetExpandedRestaurant = restaurantId => (
    async (dispatch, _, { AppApi }) => {
        dispatch({ type: EXPANDED_RESTAURANT_REQUEST });
        try {
            const expandedRestaurant = await AppApi.getExpandedRestaurant(restaurantId);

            dispatch(expandedRestaurantSuccess(expandedRestaurant));
        } catch (error) {
            console.log('expanded restaurant request failed: ', error);

            dispatch(expandedRestaurantFailure(error));
        }
    }
);
