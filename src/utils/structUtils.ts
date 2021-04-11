import { EventStatus, Stats, Team, User } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';

// Statuses
export function getStatusShortTitle(status: EventStatus): string {
    switch (status) {
    case EventStatus.UnknownEvent:      return 'Ошибка';
    case EventStatus.NotStartedEvent:   return 'Создан';
    case EventStatus.RegistrationEvent: return 'Регистрация';
    case EventStatus.InProgressEvent:   return 'Идёт';
    case EventStatus.FinishedEvent:     return 'Прошёл';
    }
}

// Meeting
export function meetingResult(stats: Array<Stats> | null, teams: Array<Team>): string {
    if (!stats || !stats.length) return '-';
    const leftStat = stats.find(stat => stat.teamId === teams[0].id && !stat.playerId);
    const rightStat = stats.find(stat => stat.teamId === teams[1].id && !stat.playerId);
    const leftResult = leftStat ? leftStat.score : 0;
    const rightResult = rightStat ? rightStat.score : 0;
    return `${leftResult} - ${rightResult}`;
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
