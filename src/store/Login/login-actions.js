import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    GUEST_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
} from './login-types';

const loginRequest = () => ({ type: USER_LOGIN_REQUEST });
const userLoginSuccess = user => ({ type: USER_LOGIN_SUCCESS, payload: user });
const guestLoginSuccess = user => ({ type: GUEST_LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: USER_LOGIN_FAILURE, payload: error });

export const asyncLoginGuestUser = () => async (dispatch, _, { AppApi }) => {
    dispatch(loginRequest());

    try {
        const guestUser = await AppApi.loginGuest();

        dispatch(guestLoginSuccess(guestUser));
    } catch (error) {
        console.log('user login failed: ', error);

        dispatch(loginFailure(error));
    }
};

export const asyncLoginUser = (userDetails, history) => async (dispatch, _, { AppApi }) => {
    dispatch(loginRequest());

    try {
        const user = await AppApi.loginUser(userDetails);

        dispatch(userLoginSuccess(user));
        history.push('/');
    } catch (error) {
        console.log('user login failed: ', error);

        dispatch(loginFailure(error));
    }
};

export const asyncSignUpUser = (userDetails, history) => async (dispatch, _, { AppApi }) => {
    dispatch(loginRequest());

    try {
        const user = await AppApi.signUpUser(userDetails);

        dispatch(userLoginSuccess(user));
        history.push('/');
    } catch (error) {
        console.log('user sign up failed: ', error);

        dispatch(loginFailure(error));
    }
};
