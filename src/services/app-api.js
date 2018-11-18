import axios from 'axios';
// import MOCK_DATA from '../store/mock-data';

class AppAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    makeUrl(endpoint, queryString) {
        if (queryString) {
            return `${this.baseUrl}/${endpoint}?${queryString}`;
        }

        return `${this.baseUrl}/${endpoint}`;
    }

    static unwrapData(axiosRequest) {
        return new Promise((resolve, reject) => {
            axiosRequest
                .then(res => resolve(res.data))
                .catch(error => reject(error));
        });
    }

    /**
     * Gets a new guest user
     *
     * @returns {AxiosPromise<any>} resolves to userId string
     */
    loginGuest() {
        return AppAPI.unwrapData(axios.get(this.makeUrl('guest-home')));
    }

    /**
     * Gets a previously signed up user
     *
     * @param { username, password } object user details
     * @returns {AxiosPromise<any>} resolves to a user entity
     */
    loginUser({ username, password }) {
        return AppAPI.unwrapData(
            axios.get(this.makeUrl('home', `username=${username}&password=${password}`)),
        );
    }

    /**
     * Posts a new user
     *
     * @param { username, password, name, img, owner } object user details
     * @returns {AxiosPromise<any>} resolves to a user entity
     */
    signUpUser(signUpDetails) {
        return AppAPI.unwrapData(
            axios.post(this.makeUrl('signup'), signUpDetails),
        );
    }

    /**
     * Initiates a new restaurant search for a given user
     *
     * @param { lat, lon, time, day } object search details
     * @returns {AxiosPromise<any>} resolves to a user entity
     */
    searchRestaurants(userId, searchDetails) {
        return AppAPI.unwrapData(
            axios.post(this.makeUrl(`user/${userId}/search-restaurant`), searchDetails),
        );
    }

    /**
     * Gets a previously signed up user
     *
     * @param restaurantId string id
     * @returns {AxiosPromise<any>} resolves to a user entity
     */
    getExpandedRestaurant(restaurantId) {
        return AppAPI.unwrapData(
            axios.get(this.makeUrl(`view-restaurant/${restaurantId}`)),
        );
    }

    /**
     * Favourites a restaurant for a signed up user
     *
     * @param restaurantId string id
     * @param userId string id
     * @returns {AxiosPromise<any>} resolves to a list of favourited restaurants
     */
    favouriteRestaurant(restaurantId, userId) {
        return AppAPI.unwrapData(
            axios.post(this.makeUrl(`user/${userId}/like-restaurant/${restaurantId}`), null),
        );
    }

    /**
     * Deletes a restaurant favourite for a signed up user
     *
     * @param restaurantId string id
     * @param userId string id
     * @returns {AxiosPromise<any>} resolves to a list of favourited restaurants
     */
    deleteRestaurantFavourite(restaurantId, userId) {
        return AppAPI.unwrapData(
            axios.delete(this.makeUrl(`user/${userId}/remove-liked-restaurant/${restaurantId}`)),
        );
    }

    /**
     * Favourites a food type at a given restaurant for a signed up user
     *
     * @param restaurantId string id
     * @param userId string id
     * @returns {AxiosPromise<any>} resolves to a list of favourited restaurants
     */
    favouriteFood(restaurantId, userId, foodType) {
        return AppAPI.unwrapData(
            axios.post(this.makeUrl(`user/${userId}/like-food/${restaurantId}`), {
                food_type: foodType,
            }),
        );
    }

    /**
     * Deletes a food favourite at a given restaurant for a signed up user
     *
     * @param restaurantId string id
     * @param userId string id
     * @returns {AxiosPromise<any>} resolves to a list of favourited restaurants
     */
    deleteFoodFavourite(restaurantId, userId, foodType) {
        return AppAPI.unwrapData(
            axios.delete(this.makeUrl(`user/${userId}/restaurant/${restaurantId}/remove-fave-food/${foodType}`)),
        );
    }
}

export default AppAPI;
