export interface Team {
    id: number,
    name: string,
    about: string | null,
    location: string | null,
    ownerId: number,
    players: Array<User>,
    avatar: IAvatar,
}

export interface Tournament {
    id: number,
    name: string,
    about: string,
    system: string,
    ownerId: number,
    avatar: IAvatar,
    created: number,
    location: string,
    teams: Array<Team>
    status: EventStatus,
    meetings: Array<Meeting>,
    sport: string // Sport.name
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
    birthday?: string,
    avatar?: IAvatar
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
    teams: Array<Team>,
    attachments?: Array<IAvatar>,
}

export interface Skill {
    id: number,
    name: string,
    approvals: Array<SkillApproval>
}

export interface SkillApproval {
    id: number,
    skillId: number,
    createAt: number,
    toUid: number,
    fromUser: User
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

export interface Sport {
    id: number,
    name: string,
    about: string,
    avatar: string
}

export interface Notification {
    type: 'added_to_team' | 'tournament_started' | 'tournament_finished'| 'meeting_started' | 'meeting_finished',
    createAt: number,
    source_uid: number,
    target_uid: number,
    tournament_id: number,
    meeting_id: number,
    team_id: number,
    isRead: boolean,
}

export interface Invite {
    id: number,
    invited_id: number,
    assigned_id: number,
    team_id: number,
    state: InviteStatus
}

export enum InviteStatus {
    Pending,
    Rejected,
    Accepted
}
