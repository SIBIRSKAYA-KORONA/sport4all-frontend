import Network from 'Core/network';
import { InviteStatus } from 'Utils/enums';
import HttpStatusCode from 'Utils/httpErrors';
import { InviteWithTeam, InviteWithUser, Team, Tournament, User } from 'Utils/types';

class InvitesModel {
    static async getInvites():Promise<HttpStatusCode | InviteWithTeam[]> {
        return Network.fetchGet(Network.paths.invites.base)
            .then(response => {
                if (response.status >= 400) throw response.status;
                return response.json();
            });
    }

    // from team to user
    static async fromTeamToPlayer(team:Team, newPlayer:User):Promise<HttpStatusCode|void> {
        const body = {
            invited_id:     newPlayer.id,
            team_id:        team.id,
            type:           'direct'
        }
        return Network.fetchPost(Network.paths.invites.teams, body)
            .then(res => {
                if (res.status >= 400) throw res.status;
            });
    }

    static async loadInvitesToTheTeam(team:Team, type:InviteStatus):Promise<HttpStatusCode|InviteWithUser[]> {
        return Network.fetchGet(Network.paths.invites.forTeam(team.id, type))
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            });
    }

    static async loadInvitesToTheTournament(tournament:Tournament, type:InviteStatus):Promise<HttpStatusCode|InviteWithTeam[]> {
        return Network.fetchGet(Network.paths.invites.forTournaments(tournament.id, type))
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            });
    }

    // from user to the team
    static async fromPlayerToTeam(team:Team, newPlayer:User):Promise<HttpStatusCode|void> {
        const body = {
            invited_id:     newPlayer.id,
            team_id:        team.id,
            type:           'indirect'
        }
        return Network.fetchPost(Network.paths.invites.teams, body)
            .then(res => {
                if (res.status >= 400) throw res.status;
            });
    }

    static async replyToInvite(inviteID:number, reply:InviteStatus.Rejected | InviteStatus.Accepted):Promise<HttpStatusCode|void> {
        return Network.fetchPut(Network.paths.invites.reply(inviteID), { state:reply })
            .then(res => {
                if (res.status >= 400) throw res.status;
            });
    }

    static async fromTournamentToTeam(tournament:Tournament, team:Team):Promise<HttpStatusCode|void> {
        const body = {
            invited_id:     team.ownerId,
            team_id:        team.id,
            tournament_id:  tournament.id,
            type:           'direct'
        }
        return Network.fetchPost(Network.paths.invites.tournaments, body)
            .then(res => {
                if (res.status >= 400) throw res.status;
            });
    }

    static async fromTeamToTournament(tournament:Tournament, team:Team):Promise<HttpStatusCode|void> {
        const body = {
            invited_id:     team.ownerId,
            team_id:        team.id,
            tournament_id:  tournament.id,
            type:           'indirect'
        }
        return Network.fetchPost(Network.paths.invites.tournaments, body)
            .then(res => {
                if (res.status >= 400) throw res.status;
            });
    }
}

export default InvitesModel;
