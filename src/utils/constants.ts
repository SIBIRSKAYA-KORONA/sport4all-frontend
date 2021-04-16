import { ProfileSections, ProfilePersonalSections, TeamSections, TeamSettingsSections } from 'Utils/enums';

const URL_PARAMS = {
    team: {
        id: 'teamID',
        section: 'teamSection',
        settingsSection: 'teamSettingsSection',
    },
};

const CONST = {
    PATHS: {
        login: '/login',
        signup: '/signup',
        feed: '/feed',
        profile: {
            __config: '/profile/:nickname/:section?/:personalSection?',
            id__config: '/profile/:nickname',
            nickname: (nickname:string):string => `/profile/${nickname}/${ProfileSections.Tournaments}`,
            section: (nickname:string, section?:ProfileSections):string => `/profile/${nickname}/${section || ':section'}`,
            personal: {
                base: '/profile/:nickname/personal',
                section: (nickname:string, section?:ProfilePersonalSections):string => `/profile/${nickname}/personal/${section || ':personalSection'}`,
            }
        },
        teams: {
            __config: `/teams/:${URL_PARAMS.team.id}?/:${URL_PARAMS.team.section}?/:${URL_PARAMS.team.settingsSection}?`,
            id__config: '/teams/:id',
            create: '/teams/create',
            id: (id: number):string => `/teams/${id}/${TeamSections.Players}`,
            section: (id:number, section:TeamSections):string => `/teams/${id}/${section}`,
            settings: {
                config: `/teams/${URL_PARAMS.team.id}/${TeamSections.Settings}/:${URL_PARAMS.team.settingsSection}`,
                section: (id:number, section:TeamSettingsSections):string => `/teams/${URL_PARAMS.team.id}/${TeamSections.Settings}/${section}`
            }
        },
        meetings: {
            id: (id: string | number | null):string => '/meetings/'+(id ? id : ':id'),
        },
        tournaments: {
            base: '/tournaments',
            create: '/tournaments/create',
            list: '/tournaments/feed',
            meetings: (id: number | null):string => `/tournaments/${id ? id : ':tournamentId'}/meetings`,
            id: (id: string | number | null):string => '/tournaments/'+(id ? id : ':tournamentId'),
        }
    },
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

export { CONST, URL_PARAMS };
