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

    /**
     * Gets all classrooms for a given building
     *
     * @param buildingId string ID matching a building the api is aware of
     * @returns {AxiosPromise<any>} resolves to an array of classrooms for that building
     */
    fetchClassrooms(buildingId) {
        return axios.get(this.makeUrl(`buildings/${buildingId}/classrooms`));
    }
}

export default AppAPI;
