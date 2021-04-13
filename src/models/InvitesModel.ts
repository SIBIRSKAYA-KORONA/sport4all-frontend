import Network from 'Core/network';
import HttpStatusCode from 'Utils/httpErrors';
import { Invite, Team, User } from 'Utils/types';

class InvitesModel {
    static async getInvites():Promise<HttpStatusCode | Invite[]> {
        return Network.fetchGet(Network.paths.invites.base)
            .then(response => {
                if (response.status >= 400) throw response.status;
                return response.json();
            });
    }

    static async inviteToTheTeam(team:Team, newPlayer:User):Promise<HttpStatusCode|void> {
        const body = {
            creator_id:     team.ownerId,
            assigned_id:    newPlayer.id,
            invited_id:     newPlayer.id,
            state:          0,
            team_id:        team.id,
            type:           'direct'
        }
        return Network.fetchPost(Network.paths.invites.base, body)
            .then(res => {
                if (res.status >= 400) throw res.status;
            });
    }
}

export default InvitesModel;
