import { CONST } from 'Constants';
import store from '../store/store';
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

    async saveTeams() {
        localStorage.setItem(
            CONST.LOCAL_STORAGE.TEAMS,
            JSON.stringify(store.getState().teams));
    }

    async loadTeams() {
        return Network.fetchGet(Network.paths.teams)
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
