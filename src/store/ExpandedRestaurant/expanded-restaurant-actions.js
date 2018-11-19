import {
    EXPANDED_RESTAURANT_REQUEST,
    EXPANDED_RESTAURANT_SUCCESS,
    EXPANDED_RESTAURANT_FAILURE,
    FAVOURITE_RESTAURANT_REQUEST,
    FAVOURITE_RESTAURANT_SUCCESS,
    FAVOURITE_RESTAURANT_FAILURE,
    FAVOURITE_FOOD_REQUEST,
    FAVOURITE_FOOD_SUCCESS,
    FAVOURITE_FOOD_FAILURE,
    REMOVE_RESTAURANT_REQUEST,
    REMOVE_RESTAURANT_SUCCESS,
    REMOVE_RESTAURANT_FAILURE,
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

export const asyncFavouriteRestaurant = restaurantId => async (dispatch, getState, { AppApi }) => {
    dispatch({ type: FAVOURITE_RESTAURANT_REQUEST });

    try {
        const {
            login: {
                user: {
                    id,
                    likedRestaurants,
                },
            },
        } = getState();

        const favouriteRestaurants =
            likedRestaurants.find(restaurant => restaurant.rid.trim() === restaurantId.trim()) ?
                await AppApi.deleteRestaurantFavourite(restaurantId.trim(), id.trim()) :
                await AppApi.favouriteRestaurant(restaurantId.trim(), id.trim());

        dispatch({ type: FAVOURITE_RESTAURANT_SUCCESS, payload: favouriteRestaurants });
    } catch (error) {
        console.log('restaurant favourite request failed: ', error);

        dispatch({ type: FAVOURITE_RESTAURANT_FAILURE });
    }
};

export const asyncFavouriteFood = ({ type, restaurantId }) => (
    async (dispatch, getState, { AppApi }) => {
        dispatch({ type: FAVOURITE_FOOD_REQUEST });

        try {
            const {
                login: {
                    user: {
                        id,
                        favouritedFoods,
                    },
                },
            } = getState();

            const favouriteFoods =
                favouritedFoods.find(food => (
                    food.restaurantId.trim() === restaurantId.trim() &&
                    food.food_type.trim() === type.trim()
                )) ?
                    await AppApi.deleteFoodFavourite(restaurantId, id, type) :
                    await AppApi.favouriteFood(restaurantId, id, type);

            dispatch({ type: FAVOURITE_FOOD_SUCCESS, payload: favouriteFoods });
        } catch (error) {
            console.log('food favourite request failed: ', error);

            dispatch({ type: FAVOURITE_FOOD_FAILURE });
        }
    }
);

export const asyncRemoveRestaurant = (restaurantId, history) => (
    async (dispatch, getState, { AppApi }) => {
        dispatch({ type: REMOVE_RESTAURANT_REQUEST });

        try {
            const {
                login: {
                    user: {
                        id,
                    },
                },
            } = getState();

            const restaurants = await AppApi.removeRestaurant(restaurantId, id);

            dispatch({ type: REMOVE_RESTAURANT_SUCCESS, payload: restaurants });

            history.push('/account');
        } catch (error) {
            console.log('expanded restaurant request failed: ', error);

            dispatch({ type: REMOVE_RESTAURANT_FAILURE });
        }
    }
);
