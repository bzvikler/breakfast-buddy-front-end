import {
    LOGIN_DUMMY,
} from './login-types';

const INITIAL_STATE = {
    dummyState: null,
};

const LoginReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case LOGIN_DUMMY:
            return {
                ...state,
                dummyState: payload,
            };

        default:
            return state;
    }
};

export default LoginReducer;
