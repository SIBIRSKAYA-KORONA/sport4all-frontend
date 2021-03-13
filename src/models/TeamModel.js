import Network from '../core/network';

// SINGLETON
const teamModelSymbol = Symbol('Model for team');
const teamModelEnforcer = Symbol('The only object that can create TeamModel');

class TeamModel {
    constructor(enforcer) {
        if (enforcer !== teamModelEnforcer)
            throw 'Instantiation failed: use TeamModel.instance instead of new()';
    }

    static get instance() {
        if (!this[teamModelSymbol])
            this[teamModelSymbol] = new TeamModel(teamModelEnforcer);
        return this[teamModelSymbol];
    }

    static set instance(v) {
        throw 'Can\'t change constant property!';
    }

    /**************************************
                    Team
     *************************************/

    async createTeam(team) {
        return Network.fetchPost(Network.paths.teams, team)
            .then(response => {
                if (response.status > 499) throw new Error('server error');
                else return response.json();
            })
            .catch(error => { throw new Error(error); });
    }

    async loadTeams(role) {
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
}

export default TeamModel;
