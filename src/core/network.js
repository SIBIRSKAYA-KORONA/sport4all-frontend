'use strict';

// import getCookie from 'Utils/csrf';

export default class Network {
    static url = 'https://sport4all.tech/api';
    static paths = {
        settings: '/settings'
    };

    /**
     * @param path {Network.paths} Path to send the query to
     * @return {Promise} Promise for the HTTP request
     */
    static async fetchGet(path) {
        // const token = getCookie('csrf');
        return fetch(this.url + path, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: {
                // 'X-CSRF-Token': token
            },
        });
    }

    /**
     * @param path {Network.paths} Path to send the query to
     * @param body {Object} Body of the query (will be serialized as json)
     * @return {Promise} Promise for the HTTP request
     */
    static fetchPost = (path, body) => {
        // const token = getCookie('csrf');
        return fetch(this.url + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                // 'X-CSRF-Token': token
            },
            body: JSON.stringify(body)
        });
    };

    /**
     * @param path {Network.paths} Path to send the query to
     * @param body {Object} Body of the query (will be serialized as json)
     * @return {Promise} Promise for the HTTP request
     */
    static fetchPut = (path, body) => {
        // const token = getCookie('csrf');
        return fetch(this.url + path, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                // 'X-CSRF-Token': token
            },
            body: JSON.stringify(body)
        });
    };

    /**
     * @param path {Network.paths} Path to send the query to
     * @param body {Object} Body of the query (will be serialized as json)
     * @return Promise {Promise} for the HTTP request
     */
    static fetchDelete = (path, body) => {
        // const token = getCookie('csrf');
        return fetch(this.url + path, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                // 'X-CSRF-Token': token
            },
            body: JSON.stringify(body)
        });
    };
}
