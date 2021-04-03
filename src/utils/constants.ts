import { ProfileSections, ProfileSettingsSections, TeamSections } from 'Utils/enums';

const CONST = {
    PATHS: {
        login: '/login',
        signup: '/signup',
        profile: {
            __config: '/profile/:nickname/:section?/:settingsSection?',
            id__config: '/profile/:nickname',
            section: (nickname:string, section?:ProfileSections):string => `/profile/${nickname}/${section || ':section'}`,
            settings: {
                base: '/profile/:nickname/settings',
                section: (nickname:string, section?:ProfileSettingsSections):string => `/profile/${nickname}/settings/${section || ':settingsSection'}`,
            }
        },
        teams: {
            __config: '/teams/:id?/:section?',
            base: '/teams',
            create: '/teams/create',
            id: (id: number):string => `/teams/${id}/${TeamSections.Players}`,
            id_config: '/teams/:id',
        },
        meetings: {
            id: (id: string | number | null):string => '/meetings/'+(id ? id : ':id'),
        },
        tournaments: {
            base: '/tournaments',
            create: '/tournaments/create',
            list: '/tournaments/list',
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

export default CONST;
