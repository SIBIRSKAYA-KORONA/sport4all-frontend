type s = string;

export default class Network {
    static url:s = 'https://sport4all.tech/api';
    static paths = {
        settings: '/settings' as s,
        teams: '/teams' as s,
        tournaments: '/tournaments' as s,
        tournamentsFeed: (offset:number):s => `/tournaments/feeds?offset=${offset}`,
        sessions: '/sessions' as s,
        meetings: {
            base: '/meetings' as s,
            id: (mid:number):s => '/meetings/'+mid,
            addTeam: (id:number, tid:number):s => `/meetings/${id}/teams/${tid}`,
            addResultsForTeam: (mid:number, tid:number):s => `/meetings/${mid}/teams/${tid}/stat`,
            stats: (mid:number):s => `/meetings/${mid}/stat`,
            addResultsForPlayer: (mid:number, tid:number, pid:number):s => `/meetings/${mid}/teams/${tid}/players/${pid}/stat`
        },
        profile: {
            nickname: (nickname:string):s => `/profile/${nickname}`,
            skills: (pid:number):s => `/profile/${pid}/skills`,
        },
        skills: {
            search: (text:string):s => `/skills/search?name=${text}&limit=10`,
            create: (pid:number):s => `/skills/${pid}`,
            approve: (sid:number, pid:number):s => `/skills/${sid}/approve/${pid}`,
        },
        sports: '/sports' as s,
        notifications: '/messages' as s,
        invites: {
            base: '/invites' as s
        }
    };

    static async fetchGet(path:s):Promise<Response> {
        return fetch(this.url + path, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        });
    }

    static async fetchPost(path:s, body:any):Promise<Response> {
        return fetch(this.url + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body)
        });
    }

    static async fetchPut(path:s, body:any):Promise<Response> {
        return fetch(this.url + path, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body)
        });
    }

    static async fetchDelete(path:s, body:any):Promise<Response> {
        return fetch(this.url + path, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body)
        });
    }

    static async uploadFile(formData:FormData):Promise<Response> {
        return fetch('https://sport4all.tech/api/attachments', {
            method: 'POST',
            body: formData,
            mode: 'cors',
            credentials: 'include'
        });
    }
}
