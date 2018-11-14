import {
    USER_LOCATION_REQUEST,
    USER_LOCATION_SUCCESS,
    USER_LOCATION_FAILURE,
} from './location-types';

const INITIAL_STATE = {
    gettingLocation: null,
    lat: null,
    lng: null,
};

const LocationReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case USER_LOCATION_REQUEST:
            return {
                ...state,
                gettingLocation: true,
            };
        case USER_LOCATION_FAILURE:
            return {
                ...state,
                gettingLocation: false,
            };
        case USER_LOCATION_SUCCESS:
            return {
                ...state,
                lat: payload.lat,
                lng: payload.lng,
                gettingLocation: false,
            };
        default:
            return state;
    }
};

export default LocationReducer;
