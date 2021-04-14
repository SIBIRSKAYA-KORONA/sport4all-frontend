import { InviteStatus, TeamPlayerRoles } from 'Utils/enums';

type s = string;

function getInviteState(type:InviteStatus):string {
    switch (type) {
    case InviteStatus.Accepted: return 'accepted';
    case InviteStatus.Pending:  return 'opened';
    case InviteStatus.Rejected: return 'rejected';
    }
}

export default class Network {
    static url:s = 'https://sport4all.tech/api';
    static paths = {
        settings: '/settings' as s,
        teams: {
            create: '/teams' as s,
            id: (tid:number):s => `/teams/${tid}`,
            forUser: (role:TeamPlayerRoles, uid:number):s => `/teams?role=${role}&userId=${uid}`,
            searchUsers: (tid:number, nick:string, limit:number):s => `/teams/${tid}/members/search?nickname=${nick}&limit=${limit}`,
            addPlayer: (tid:number, uid:number):s => `/teams/${tid}/members/${uid}?role=player`,
            player: (tid:number, uid:number):s => `/teams/${tid}/members/${uid}`,
            search: (name:string, limit:number):s => `/teams/search?name=${name}&limit=${limit}`
        },
        tournaments: {
            create: '/tournaments' as s,
            id: (tid:number):s => `/tournaments/${tid}`,
            search: (name:string, limit:number):s => `/tournaments/search?name=${name}&limit=${limit}`,
            meetings: (tid:number):s => `/tournaments/${tid}/meetings`,
            teams: (tid:number):s => `/tournaments/${tid}/teams`,
            team: (tid:number, teamID:number):s => `/tournaments/${tid}/teams/${teamID}`,
            forUser: (uid:number):s => `/tournaments?userId=${uid}`,
        },
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
            stats: (pid:number):s => `/profile/${pid}/stats`,
            search: (nick:string, limit:number):s => `/profile/search?name=${nick}&limit=${limit}`,
        },
        skills: {
            search: (text:string):s => `/skills/search?name=${text}&limit=10`,
            create: (pid:number):s => `/skills/${pid}`,
            approve: (sid:number, pid:number):s => `/skills/${sid}/approve/${pid}`,
        },
        sports: '/sports' as s,
        notifications: '/messages' as s,
        invites: {
            base: '/invites' as s,
            forTeam: (tid:number, type:InviteStatus):s => `/invites/teams/${tid}?state=${getInviteState(type)}`,
            reply: (iid:number):s => `/invites/${iid}`,
            tournaments: '/invites/tournaments',
            teams: '/invites/teams',
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
