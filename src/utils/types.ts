export interface Team {
    id: number,
    name: string,
    about: string | null,
    location: string | null,
    ownerId: number,
    players: Array<User>,
    avatar: IAvatar,
}

export interface IAvatar {
    id: number,
    filename: string,
    key: string,
    url: string
}

export interface User {
    id: number,
    name: string,
    surname: string,
    nickname: string,
    created: number,
    height: number,
    email?: string,
    about?: string,
    birthday?: string
}

export interface Meeting {
    id: number,
    status: EventStatus,
    round: number,
    group: number,
    tournamentId: number,
    stats: Array<Stats>,
    nextMeetingID: number,
    prevMeetings: Array<Meeting>,
    teams: Array<Team>
}

export enum EventStatus {
    UnknownEvent,
    NotStartedEvent,
    RegistrationEvent,
	InProgressEvent,
	FinishedEvent,
}

export interface Stats {
    id?: number,
    score: number,
    meetingId: number,
    teamId: number,
    playerId?: number
}
