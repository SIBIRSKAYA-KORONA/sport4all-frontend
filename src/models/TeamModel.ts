import Network from 'Core/network';
import { Team, User } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';
import { TeamPlayerRoles } from 'Utils/enums';

class TeamModel {
    static async createTeam(team:Team):Promise<HttpStatusCode|Team> {
        return Network.fetchPost(Network.paths.teams.create, team)
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            })
            .then(team => {
                if (!team || !team.id) throw HttpStatusCode.INTERNAL_SERVER_ERROR;
                return team;
            });
    }

    static async loadTeam(tid:number):Promise<HttpStatusCode|Team> {
        return Network.fetchGet(Network.paths.teams.id(tid))
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            })
            .then((team:Team) => {
                if (!team.players) team.players = [];
                return team;
            });
    }

    static async loadTeams(role:TeamPlayerRoles, uid:number):Promise<HttpStatusCode|Team[]> {
        return Network.fetchGet(Network.paths.teams.forUser(role, uid))
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json()
            });
    }

    static async loadPlayersToAdd(tid:number, nicknamePart:string):Promise<HttpStatusCode|User[]> {
        return Network.fetchGet(Network.paths.teams.searchUsers(tid, nicknamePart, 10))
            .then(res => {
                if (res.status === HttpStatusCode.NOT_FOUND) return [];
                if (res.status >= 400 && res.status !== HttpStatusCode.NOT_FOUND) throw res.status;
                return res.json();
            });
    }

    static async addPlayerToTheTeam(tid:number, uid:number):Promise<HttpStatusCode|void> {
        return Network.fetchPost(Network.paths.teams.addPlayer(tid, uid), { body: 'hello there' })
            .then(res => {
                if (res.status >= 400) throw res.status;
                return;
            });
    }

    static async removePlayerFromTheTeam(tid:number, uid:number):Promise<HttpStatusCode|void> {
        return Network.fetchDelete(Network.paths.teams.player(tid, uid), {})
            .then(res => {
                if (res.status >= 400) throw res.status;
                return;
            });
    }

    static async searchTeams(namePart:string, limit:number):Promise<HttpStatusCode|Team[]> {
        return Network.fetchGet(Network.paths.teams.search(namePart, limit))
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            });
    }
}

export default TeamModel;
