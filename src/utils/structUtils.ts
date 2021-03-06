import { EventStatus, Invite, InviteWithTournament, MeetingResult, Stats, Team, Tournament, User } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';
import { InviteStatus } from 'Utils/enums';

// Statuses
export function getStatusShortTitle(status: EventStatus): string {
    switch (status) {
    case EventStatus.UnknownEvent:      return 'Ошибка';
    case EventStatus.NotStartedEvent:   return 'Создан';
    case EventStatus.RegistrationEvent: return 'Регистрация';
    case EventStatus.InProgressEvent:   return 'В процессе';
    case EventStatus.FinishedEvent:     return 'Завершён';
    }
}

// Meeting
export function meetingResult(stats: Array<Stats> | null, teams: Array<Team>): MeetingResult {
    const result:MeetingResult = { left:0, right:0 };
    if (!stats || !stats.length) return result;
    const leftStat = stats.find(stat => stat.teamId === teams[0].id && !stat.playerId);
    const rightStat = stats.find(stat => stat.teamId === teams[1].id && !stat.playerId);
    result.left = leftStat ? leftStat.score : 0;
    result.right = rightStat ? rightStat.score : 0;
    return result;
}

export function teamScore(stats: Stats[], team:Team): number {
    return stats.reduce((total, s) => s.teamId === team.id && s.playerId !== 0 ? total + s.score : total, 0);
}

type initStats = {
    [id:number]: number
}

export function initStats(teams: Array<Team>):initStats {
    if (!teams) return {};
    for (const team of teams) {
        if (!team.players) return {};
    }

    return teams.reduce((totalTeamed, team) => ({
        ...totalTeamed,
        ...team.players.reduce((totalPlayered, player) => ({
            ...totalPlayered,
            [player.id]:null,
        }), {})
    }), {});
}

// User
export function lettersForUserAvatar(user: User):string {
    if (user.name && user.surname) return lettersForAvatar(`${user.name} ${user.surname}`);
    if (user.name) return lettersForAvatar(user.name);
    if (user.nickname) return lettersForAvatar(user.nickname);
}

export function allEventStatuses(withError: boolean): Array<EventStatus> {
    const all = Object.keys(EventStatus).filter(key => isNaN(+key) && +key !== EventStatus.UnknownEvent).map(key => EventStatus[key]);
    return withError ? all : all.filter(s => s !== EventStatus.UnknownEvent);
}

// Invite
export function findPendingTeamInvite(invites:Invite[], team:Team):Invite|undefined {
    return invites.find(invite => invite.team_id === team.id && invite.state === InviteStatus.Pending);
}

export function findPendingUserInvite(invites:Invite[], user:User):Invite|undefined {
    return invites.find(invite => invite.invited_id === user.id && invite.state === InviteStatus.Pending);
}

export function findPendingTournamentInvite(invites:InviteWithTournament[], t:Tournament):InviteWithTournament|undefined {
    return invites.find(invite => invite.tournament_id === t.id && invite.state === InviteStatus.Pending);
}

export function isTournamentInvite(invite:Invite):boolean {
    return Object.prototype.hasOwnProperty.call(invite, 'tournament');
}
