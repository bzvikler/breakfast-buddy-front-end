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
     * Gets all classrooms for a given building
     *
     * @param { username, password } object user details
     * @returns {AxiosPromise<any>} resolves to a user entity
     */
    loginUser({ username, password }) {
        return AppAPI.unwrapData(
            axios.get(this.makeUrl('home', `username=${username}&password=${password}`))
        );
    }
}

export default AppAPI;
