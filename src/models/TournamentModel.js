import Network from '../core/network';

// SINGLETON
const tournamentModelSymbol = Symbol('Model for tournament');
const tournamentModelEnforcer = Symbol('The only object that can create TournamentModel');

class TournamentModel {
    constructor(enforcer) {
        if (enforcer !== tournamentModelEnforcer)
            throw 'Instantiation failed: use TournamentModel.instance instead of new()';
    }

    static get instance() {
        if (!this[tournamentModelSymbol])
            this[tournamentModelSymbol] = new TournamentModel(tournamentModelEnforcer);
        return this[tournamentModelSymbol];
    }

    static set instance(v) {
        throw 'Can\'t change constant property!';
    }

    /**************************************
                    Tournament
     *************************************/

    async createTournament(tournamentData) {
        return Network.fetchPost(Network.paths.tournaments, tournamentData)
            .then(response => {
                if (response.status > 499) throw new Error('server error');
                else return response.json();
            })
            .catch(error => { throw new Error(error); });
    }


    async getTournament(tournamentId) {
        return Network.fetchGet(Network.paths.tournaments + `/${tournamentId}`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return undefined;
            })
    }

    async getTeams(tournamentId) {
        return Network.fetchGet(Network.paths.tournaments + `/${tournamentId}/teams`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return undefined;
            })
    }

    async addTeam(tournamentId, teamId) {
        return Network.fetchPut(Network.paths.tournaments + `/${tournamentId}/teams/${teamId}`, {})
            .then(response => {
                console.log(response);
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return undefined;
            })
    }

    async loadTournaments(role) {
        return Network.fetchGet(Network.paths.tournaments + `?role=${role}`)
            .then(response => {
                console.log(response);
                return response.json()
            })
            .catch(error => {
                console.error(error);
                return [];
            })
    }
}

export default TournamentModel;
