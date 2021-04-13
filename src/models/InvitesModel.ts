import Network from 'Core/network';
import HttpStatusCode from 'Utils/httpErrors';
import { Invite, InviteForUser, InviteFromTeam, Team, User } from 'Utils/types';
import { InviteStatus } from 'Utils/enums';

class InvitesModel {
    static async getInvites():Promise<HttpStatusCode | InviteForUser[]> {
        return Network.fetchGet(Network.paths.invites.base)
            .then(response => {
                if (response.status >= 400) throw response.status;
                return response.json();
            });
    }

    // from team to user
    static async fromTeamToPlayer(team:Team, newPlayer:User):Promise<HttpStatusCode|void> {
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

    static async loadInvitesToTheTeam(team:Team, type:InviteStatus):Promise<HttpStatusCode|InviteFromTeam[]> {
        return Network.fetchGet(Network.paths.invites.forTeam(team.id, type))
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            });
    }

    // from user to the team
    static async fromPlayerToTeam(team:Team, newPlayer:User):Promise<HttpStatusCode|void> {
        const body = {
            creator_id:     newPlayer.id,
            assigned_id:    team.ownerId,
            invited_id:     newPlayer.id,
            state:          0,
            team_id:        team.id,
            type:           'indirect'
        }
        return Network.fetchPost(Network.paths.invites.base, body)
            .then(res => {
                if (res.status >= 400) throw res.status;
            });
    }

    static async replyToInvite(inviteID:number, reply:InviteStatus.Rejected | InviteStatus.Accepted):Promise<HttpStatusCode|void> {
        return Network.fetchPost(Network.paths.invites.reply(inviteID), { state:reply })
            .then(res => {
                if (res.status >= 400) throw res.status;
            });
    }
}

export default InvitesModel;
