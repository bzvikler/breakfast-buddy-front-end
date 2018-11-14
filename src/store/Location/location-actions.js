import {
    USER_LOCATION_REQUEST,
    USER_LOCATION_SUCCESS,
    USER_LOCATION_FAILURE,
} from './location-types';

export const locationReceived = ({ lat, lng }) => ({
    type: USER_LOCATION_SUCCESS,
    payload: { lat, lng },
});

export const locationFailed = () => ({
    type: USER_LOCATION_FAILURE,
});

export const requestLocation = () => (dispatch) => {
    dispatch({ type: USER_LOCATION_REQUEST });

    navigator.geolocation.getCurrentPosition((position) => {
        const {
            coords: {
                latitude,
                longitude,
            },
        } = position;

        dispatch(locationReceived({ lat: latitude, lng: longitude }));
    }, (err) => {
        dispatch(locationFailed());

        console.log(err);
    });
};
