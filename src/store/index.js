import { combineReducers } from 'redux';
import LoginReducer from './Login/login-reducer';

export default combineReducers({
    login: LoginReducer,
});
