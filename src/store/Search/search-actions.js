import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SET_ACTIVE_RESTAURANT,
} from './search-types';

const searchSuccess = restaurants => ({ type: SEARCH_SUCCESS, payload: restaurants });
const searchFailure = error => ({ type: SEARCH_FAILURE, payload: error });

export const asyncSearchForRestaurants = coords => async (dispatch, getState, { AppApi }) => {
    dispatch({ type: SEARCH_REQUEST });

    try {
        const {
            login: {
                user: {
                    id,
                },
            },
        } = getState();

        // TODO: add time and day tracking
        const restaurantList = await AppApi.searchRestaurants(id, {
            ...coords,
            time: '00:00',
            day: 'Monday',
        });

        dispatch(searchSuccess(restaurantList));
    } catch (error) {
        console.log('restaurant search failed: ', error);

        dispatch(searchFailure(error));
    }
};

export const setActiveRestaurant = ({
    restaurantId,
    restaurantLat,
    restaurantLng,
}, history) => (dispatch) => {
    dispatch({
        type: SET_ACTIVE_RESTAURANT,
        payload: {
            restaurantId,
            restaurantLat,
            restaurantLng,
        },
    });

    if (restaurantId) {
        history.push(`/restaurant/${restaurantId}`);
    } else {
        history.push('/');
    }
};
