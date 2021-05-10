export enum ProfileSections {
    Teams = 'teams',
    Tournaments = 'tournaments',
    Personal = 'personal',
    History = 'history'
}

export enum ProfilePersonalSections {
    Information = 'information',
    Skills = 'skills',
    Actions = 'actions',
    Invites = 'invites'
}

export enum TeamSections {
    Players = 'players',
    Settings = 'settings',
}

export enum TeamSettingsSections {
    Info = 'info',
    Invites = 'invites'
}

export enum TournamentSections {
    Grid = 'grid',
    Settings = 'settings'
}

export enum TournamentSettingsSection {
    Info = 'info',
    Invites = 'invites',
    Members = 'members',
}

export enum InviteStatus {
    Pending,
    Rejected,
    Accepted
}

export enum TournamentStatus {
    NotStarted = 1,
    Registration,
    Ongoing,
    Ended
}

export enum TeamPlayerRoles {
    owner = 'owner',
    player = 'player'
}

export enum Notifications {
    addedToTeam = 'added_to_team',
    tournamentStarted = 'tournament_started',
    tournamentFinished = 'tournament_finished',
    meetingStarted = 'meeting_started',
    meetingFinished = 'meeting_finished',

    teamDirectInviteCreated = 'team_direct_invite_created',
    teamDirectInviteUpdated = 'team_direct_invite_updated',
    teamIndirectInviteCreated = 'team_indirect_invite_created',
    teamIndirectInviteUpdated = 'team_indirect_invite_updated',

    tournamentDirectInviteCreated = 'tournament_direct_invite_created',
    tournamentDirectInviteUpdated = 'tournament_direct_invite_updated',
    tournamentIndirectInviteCreated = 'tournament_indirect_invite_created',
    tournamentIndirectInviteUpdated = 'tournament_indirect_invite_updated',
}

export enum SearchEntities {
    Team = 'team',
    Tournament = 'tournament',
    User = 'user',
}
