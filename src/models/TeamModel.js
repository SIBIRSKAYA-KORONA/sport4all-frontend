import Network from 'Core/network';
import {ForbiddenError, NotAuthorizedError, ServerError} from 'Utils/errors';

class TeamModel {
    static async createTeam(team) {
        return Network.fetchPost(Network.paths.teams, team)
            .then(response => {
                if (response.status > 499) throw new Error('server error');
                else return response.json();
            })
            .then(team => {
                if (!team || !team.id) throw 500;
                return team;
            });
    }

    static async loadTeam(tid) {
        return Network.fetchGet(Network.paths.teams + `/${tid}`)
            .then(response => {
                console.log(response);
                return response.json()
            })
            .catch(error => {
                console.error(error);
                return null;
            })
    }

    static async loadTeams(role) {
        return Network.fetchGet(Network.paths.teams + `?role=${role}`)
            .then(response => {
                console.log(response);
                return response.json()
            })
            .catch(error => {
                console.error(error);
                return [];
            })
    }

    static async loadPlayersToAdd(tid, nicknamePart, limit) {
        return Network.fetchGet(Network.paths.teams + `/${tid}/members/search?nickname=${nicknamePart}&limit=${limit}`)
            .then(response => {
                if (response.status === 404) return [];
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return [];
            })
    }

    static async addPlayerToTheTeam(tid, uid) {
        return Network.fetchPost(Network.paths.teams + `/${tid}/members/${uid}?role=player`, { body: 'hello there' })
            .then(response => {
                if (response.status > 499) throw new Error('Error!');
                return response;
            })
            .catch(error => {
                console.error(error);
                throw error;
            })
    }


    static async removePlayerFromTheTeam(tid, uid) {
        return Network.fetchDelete(`${Network.paths.teams}/${tid}/members/${uid}`)
            .then(res => {
                switch (res.status) {
                case 200: return;
                case 401: throw NotAuthorizedError;
                case 403: throw ForbiddenError;
                default: throw ServerError;
                }
            }).catch(e => {
                console.error(e);
                throw ServerError;
            })
    }

    static async searchTeams(namePart, limit) {
        const encodedNamePart = encodeURIComponent(namePart);
        return Network.fetchGet(Network.paths.teams + `/search?name=${encodedNamePart}&limit=${limit}`)
            .then(res => {
                switch (res.status) {
                case 200: return res.json();
                case 401: throw NotAuthorizedError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }

}

export default TeamModel;
