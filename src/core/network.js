'use strict';

// import getCookie from 'Utils/csrf';

export default class Network {
    static url = 'https://sport4all.tech/api';
    static paths = {
        settings: '/settings',
        teams: '/teams',
        tournaments: '/tournaments',
        tournamentsFeed: (offset) => `/tournaments/feeds?offset=${offset}`,
        sessions: '/sessions',
        meetings: {
            base: '/meetings',
            id: (mid) => '/meetings/'+mid,
            addTeam: (id, tid) => `/meetings/${id}/teams/${tid}`,
            addResultsForTeam: (mid, tid) => `/meetings/${mid}/teams/${tid}/stat`,
            stats: (mid) => `/meetings/${mid}/stat`,
            addResultsForPlayer: (mid, tid, pid) => `/meetings/${mid}/teams/${tid}/players/${pid}/stat`
        },
        profile: {
            nickname: (nickname) => `/profile/${nickname}`,
            skills: (pid) => `/profile/${pid}/skills`,
        },
        skills: {
            search: (text) => `/skills/search?name=${text}&limit=10`,
            create: (pid) => `/skills/${pid}`,
            approve: (sid, pid) => `/skills/${sid}/approve/${pid}`,
        },
        notifications: '/messages'
    };


    /**
     * @param path {Network.paths | string} Path to send the query to
     * @return {Promise} Promise for the HTTP request
     */
    static async fetchGet(path) {
        // const token = getCookie('csrf');
        return fetch(this.url + path, {
            method: 'GET',
            mode: 'cors',
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

    static uploadFile = formData => {
        return fetch('https://sport4all.tech/api/attachments', {
            method: 'POST',
            body: formData,
            mode: 'cors',
            credentials: 'include'
        });
    };
}
