import Network from '../core/network';

class TournamentModel {
    static async createTournament(tournamentData) {
        return Network.fetchPost(Network.paths.tournaments, tournamentData)
            .then(response => {
                if (response.status > 499) throw new Error('server error');
                else return response.json();
            })
            .catch(error => { throw new Error(error); });
    }


    static async getTournament(tournamentId) {
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

    static async getTeams(tournamentId) {
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

    static async addTeam(tournamentId, teamId) {
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

    static async loadTournaments(role) {
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
