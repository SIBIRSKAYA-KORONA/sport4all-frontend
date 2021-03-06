import { InviteStatus, Notifications } from 'Utils/enums';

export interface Team extends Avatarable {
    about: string | null,
    location: string | null,
    ownerId: number,
    players: Array<User>,
}

export interface Tournament extends Avatarable {
    about: string,
    system: string,
    ownerId: number,
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

export interface Avatarable {
    id: number,
    name: string,
    avatar?: IAvatar,
}

export interface User extends Avatarable {
    surname: string,
    nickname: string,
    created: number,
    height: number,
    email?: string,
    about?: string,
    birthday?: string,
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
    playerId?: number,
    created?: number
}

export interface Sport {
    id: number,
    name: string,
    about: string,
    avatar: string
}

export interface Notification {
    type: Notifications,
    createAt: number,
    source_uid: number,
    target_uid: number,
    tournament_id: number,
    meeting_id: number,
    team_id: number,
    isRead: boolean,
    invite_state: InviteStatus
}

export interface Invite {
    id: number,
    invited_id: number,
    assigned_id: number,
    team_id: number,
    state: InviteStatus,
    type: 'direct' | 'indirect'
}

export interface InviteWithTeam extends Invite {
    team: Team
}

export interface InviteWithUser extends Invite {
    user: User
}

export interface InviteWithTournament extends Invite {
    tournament: Tournament,
    tournament_id: number
}

export interface MeetingResult {
    left: number,
    right: number,
}

export interface AWSFile {
    filename: string,
    id: number,
    key: string,
    url: string,
}

