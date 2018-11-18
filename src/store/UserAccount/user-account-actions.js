import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
} from './user-account-types';

export const asyncGetProfile = () => async (dispatch, getState, { AppApi }) => {
    dispatch({ type: GET_PROFILE_REQUEST });

    const {
        login: {
            user: {
                id,
            },
        },
    } = getState();

    try {
        const userProfile = await AppApi.getProfile(id);

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
                },
            },
        } = getState();

        try {
            const userProfile = await AppApi.editProfile(id.trim(), {
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
