import { ProfileSections, ProfilePersonalSections, TeamSections, TeamSettingsSections } from 'Utils/enums';

const URL_PARAMS = {
    meeting: {
        id: 'meetingID',
    },
    tournament: {
        id: 'tournamentID',
    },
    team: {
        id: 'teamID',
        section: 'teamSection',
        settingsSection: 'teamSettingsSection',
    },
    profile: {
        nickname: 'nickname',
        section: 'profileSection',
        personalSection: 'profilePersonalSection',
    }
};

const PATHS = {
    root: '/',
    login: '/login',
    signup: '/signup',
    feed: '/feed',
    profile: {
        __config: `/profile/:${URL_PARAMS.profile.nickname}/:${URL_PARAMS.profile.section}?/:${URL_PARAMS.profile.personalSection}?`,
        id__config: `/profile/:${URL_PARAMS.profile.nickname}`,
        nickname: (nickname:string):string => `/profile/${nickname}/${ProfileSections.Tournaments}`,
        section: (nickname:string, section?:ProfileSections):string => `/profile/${nickname}/${section || `:${URL_PARAMS.profile.section}`}`,
        personal: {
            base: `/profile/:${URL_PARAMS.profile.nickname}/${ProfileSections.Personal}`,
            section: (nickname:string, section?:ProfilePersonalSections):string => `/profile/${nickname}/${ProfileSections.Personal}/${section || `:${URL_PARAMS.profile.personalSection}`}`,
        }
    },
    teams: {
        __config: `/teams/:${URL_PARAMS.team.id}?/:${URL_PARAMS.team.section}?/:${URL_PARAMS.team.settingsSection}?`,
        id__config: `/teams/:${URL_PARAMS.team.id}`,
        create: '/teams/create',
        id: (id: number):string => `/teams/${id}/${TeamSections.Players}`,
        section: (id:number, section:TeamSections):string => `/teams/${id}/${section}`,
        settings: {
            config: `/teams/${URL_PARAMS.team.id}/${TeamSections.Settings}/:${URL_PARAMS.team.settingsSection}`,
            section: (id:number, section:TeamSettingsSections):string => `/teams/${id}/${TeamSections.Settings}/${section}`
        }
    },
    meetings: {
        id__config: `/meetings/:${URL_PARAMS.meeting.id}`,
        id: (id: number):string => `/meetings/${id}`,
    },
    tournaments: {
        base: '/tournaments',
        create: '/tournaments/create',
        list: '/tournaments/feed',
        meetings: (id: number):string => `/tournaments/${id}/meetings`,
        meetings__config: `/tournaments/:${URL_PARAMS.tournament.id}/meetings`,
        id: (id: string | number | null):string => '/tournaments/'+(id ? id : `:${URL_PARAMS.tournament.id}`),
        id__config: `/tournaments/:${URL_PARAMS.tournament.id}`,
    }
};

const CONST = {
    SESSION_ID: 'session_id',
    BASE_SELECTOR: '#application',
    TOURNAMENTS: {
        systems: {
            roundRobin: 'circular',
            singleElimination: 'olympic',
            doubleElimination: 'double-elimination',
        }
    }
};

export { CONST, URL_PARAMS, PATHS };
