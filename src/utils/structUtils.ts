import { EventStatus, Stats, Team } from 'Utils/types';

export function getStatusShortTitle(status: EventStatus): string {
    switch (status) {
    case EventStatus.UnknownEvent:      return 'Ошибка';
    case EventStatus.NotStartedEvent:   return 'Создан';
    case EventStatus.RegistrationEvent: return 'Регистрация';
    case EventStatus.InProgressEvent:   return 'Идёт';
    case EventStatus.FinishedEvent:     return 'Прошёл';
    }
}

export function meetingResult(stats: Array<Stats> | null, teams: Array<Team>): string {
    if (!stats || !stats.length) return '-';
    return `${stats.find(stat => stat.teamId === teams[0].id).score || 0} - ${stats.find(stat => stat.teamId === teams[1].id).score || 0}`;
}