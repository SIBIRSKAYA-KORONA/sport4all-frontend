import { ProfileSections, ProfilePersonalSections, TeamSections } from 'Utils/enums';

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

export default CONST;
