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

export enum InviteStatus {
    Pending,
    Rejected,
    Accepted
}

export enum TeamPlayerRoles {
    owner = 'owner',
    player = 'player'
}
