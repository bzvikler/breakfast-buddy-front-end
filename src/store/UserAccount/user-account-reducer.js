import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
} from './user-account-types';

const INITIAL_STATE = {
    gettingProfile: null,
    profile: null,
    profileError: null,
};

const UserAccountReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                gettingProfile: true,
            };
        case GET_PROFILE_FAILURE:
        case EDIT_PROFILE_FAILURE:
            return {
                ...state,
                profileError: payload,
                gettingProfile: false,
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                gettingProfile: false,
            };
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                profile: {
                    ...payload,
                    restaurants: state.profile.restaurants,
                    favFoods: state.profile.favFoods,
                    searches: state.profile.searches,
                },
            };
        default:
            return state;
    }
};

export default UserAccountReducer;
