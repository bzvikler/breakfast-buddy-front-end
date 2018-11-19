import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    ADD_RESTAURANT_REQUEST,
    ADD_RESTAURANT_SUCCESS,
    ADD_RESTAURANT_FAILURE,
} from './user-account-types';

export const asyncGetProfile = () => async (dispatch, getState, { AppApi }) => {
    dispatch({ type: GET_PROFILE_REQUEST });

    const {
        login: {
            user: {
                id,
                owner,
            },
        },
    } = getState();

    try {
        const userProfile = owner ?
            await AppApi.getOwnerProfile(id) :
            await AppApi.getUserProfile(id);

        dispatch({ type: GET_PROFILE_SUCCESS, payload: userProfile });
    } catch (error) {
        console.log('user profile get failed: ', error);

        dispatch({ type: GET_PROFILE_FAILURE, payload: error });
    }
};

export const asyncEditProfile = profileDetails => (
    async (dispatch, getState, { AppApi }) => {
        dispatch({ type: EDIT_PROFILE_REQUEST });

        const {
            login: {
                user: {
                    id,
                    owner,
                },
            },
        } = getState();

        try {
            const userProfile = owner ?
                await AppApi.editOwnerProfile(id.trim(), {
                    ...profileDetails,
                    password: '',
                    img: '',
                }) :
                await AppApi.editUserProfile(id.trim(), {
                    ...profileDetails,
                    password: '',
                    img: '',
                });

            dispatch({ type: EDIT_PROFILE_SUCCESS, payload: userProfile });
        } catch (error) {
            console.log('user profile edit failed: ', error);

            dispatch({ type: EDIT_PROFILE_FAILURE, payload: error });
        }
    }
);

export const asyncAddRestaurant = (restaurantDetails, history) => (
    async (dispatch, getState, { AppApi }) => {
        dispatch({ type: ADD_RESTAURANT_REQUEST });

        const {
            login: {
                user: {
                    id,
                },
            },
        } = getState();

        try {
            const restaurants = await AppApi.addRestaurant(id, {
                ...restaurantDetails,
                OpenHours: [
                    {
                        day: 'Monday',
                        openTime: '00:00',
                        closeTime: '24:00',
                    },
                    {
                        day: 'Tuesday',
                        openTime: '00:00',
                        closeTime: '24:00',
                    },
                    {
                        day: 'Wednesday',
                        openTime: '00:00',
                        closeTime: '24:00',
                    },
                    {
                        day: 'Thursday',
                        openTime: '00:00',
                        closeTime: '24:00',
                    },
                    {
                        day: 'Friday',
                        openTime: '00:00',
                        closeTime: '24:00',
                    },
                    {
                        day: 'Saturday',
                        openTime: '00:00',
                        closeTime: '24:00',
                    },
                    {
                        day: 'Sunday',
                        openTime: '00:00',
                        closeTime: '24:00',
                    },
                ],
                food_types: [
                    {
                        food_type: 'pancakes',
                    },
                    {
                        food_type: 'waffles',
                    },
                    {
                        food_type: 'juice',
                    },
                ],
            });

            dispatch({ type: ADD_RESTAURANT_SUCCESS, payload: restaurants });

            history.push('/account');
        } catch (error) {
            console.log('add restaurant failed: ', error);

            dispatch({ type: ADD_RESTAURANT_FAILURE, payload: error });
        }
    }
);
