import Network from '../core/network';
import {
    BadRequestError,
    ForbiddenError,
    NotAcceptableError,
    NotAuthorizedError,
    NotFoundError,
    ServerError
} from 'Utils/errors';

class TournamentModel {
    static async createTournament(tournamentData) {
        return Network.fetchPost(Network.paths.tournaments, tournamentData)
            .then(res => {
                switch (res.status) {
                case 200: return res.json();
                case 400: throw BadRequestError;
                case 401: throw NotAuthorizedError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }

    /**
     *
     * @param {Number | String} tournamentId
     * @return {Promise<Object | IError>}
     */
    static async getTournament(tournamentId) {
        return Network.fetchGet(Network.paths.tournaments + `/${tournamentId}`)
            .then(res => {
                switch (res.status) {
                case 200: return res.json();
                case 404: throw NotFoundError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }

    /**
     *
     * @param {Number | String} tournamentId
     * @param {Object} newData
     * @return {Promise<Object | IError>}
     */
    static async updateTournament(tournamentId, newData) {
        return Network.fetchPut(Network.paths.tournaments + `/${tournamentId}`, newData)
            .then(res => {
                switch (res.status) {
                case 200: return;
                case 400: throw BadRequestError;
                case 401: throw NotAuthorizedError;
                case 403: throw ForbiddenError;
                case 404: throw NotFoundError;
                case 406: throw NotAcceptableError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }

    /**
     *
     * @param {Number | String} tournamentId
     * @return {Promise<Object | IError>}
     */
    static async getMeetings(tournamentId) {
        return Network.fetchGet(Network.paths.tournaments + `/${tournamentId}/meetings`)
            .then(res => {
                switch (res.status) {
                case 200: return res.json();
                case 400: throw BadRequestError;
                case 404: throw NotFoundError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }

    /**
     *
     * @param {Number | String} tournamentId
     * @return {Promise<Object | IError>}
     */
    static async getTeams(tournamentId) {
        return Network.fetchGet(Network.paths.tournaments + `/${tournamentId}/teams`)
            .then(res => {
                switch (res.status) {
                case 200: return res.json();
                case 400: throw BadRequestError;
                case 404: throw NotFoundError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }

    /**
     *
     * @param {Number | String} tournamentId
     * @param {Number | String} teamId
     * @return {Promise<Object | IError>}
     */
    static async addTeam(tournamentId, teamId) {
        return Network.fetchPut(Network.paths.tournaments + `/${tournamentId}/teams/${teamId}`, {})
            .then(res => {
                switch (res.status) {
                case 200: return;
                case 400: throw BadRequestError;
                case 401: throw NotAuthorizedError;
                case 403: throw ForbiddenError;
                case 404: throw NotFoundError;
                case 406: throw NotAcceptableError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }

    /**
     *
     * @param {Number | String} tournamentId
     * @param {Number | String} teamId
     * @return {Promise<Object | IError>}
     */
    static async removeTeam(tournamentId, teamId) {
        return Network.fetchDelete(Network.paths.tournaments + `/${tournamentId}/teams/${teamId}`, {})
            .then(res => {
                switch (res.status) {
                case 200: return;
                case 400: throw BadRequestError;
                case 401: throw NotAuthorizedError;
                case 403: throw ForbiddenError;
                case 404: throw NotFoundError;
                case 406: throw NotAcceptableError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }

    /**
     *
     * @param {Number | String} userId
     * @return {Promise<Object | IError>}
     */
    static async getTournaments(userId) {
        return Network.fetchGet(Network.paths.tournaments + `?userId=${userId}`)
            .then(res => {
                switch (res.status) {
                case 200: return res.json();
                case 400: throw BadRequestError;
                case 404: throw NotFoundError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                console.error(error);
                throw Error(error);
            });
    }
}

export default TournamentModel;
