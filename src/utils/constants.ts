import { ProfileSections, ProfileSettingsSections } from 'Utils/enums';

const CONST = {
    PATHS: {
        login: '/login',
        signup: '/signup',
        profile: {
            base: '/profile',
            section: (section?:ProfileSections):string => `/profile/${section || ':section'}`,
            settings: {
                base: '/profile/settings',
                section: (section?:ProfileSettingsSections):string => `/profile/settings/${section || ':settingsSection'}`,
            }
        },
        teams: {
            base: '/teams',
            create: '/teams/create',
            id: (id: string | number | null):string => '/teams/'+(id ? id : ':id'),
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
