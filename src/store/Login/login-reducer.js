import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    GUEST_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
} from './login-types';

const INITIAL_STATE = {
    user: null,
    userIsGuest: true,
    loggingIn: null,
    loginError: null,
};

const LoginReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                loginError: payload,
                loggingIn: false,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: payload,
                userIsGuest: false,
                loggingIn: false,
            };
        case GUEST_LOGIN_SUCCESS:
            return {
                ...state,
                user: payload,
                loggingIn: false,
            };
        default:
            return state;
    }
};

export default LoginReducer;
