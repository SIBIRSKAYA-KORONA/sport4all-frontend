const CONST = {
    PATHS: {
        login: '/login',
        signup: '/signup',
        profile: '/profile',
        teams: {
            base: '/teams',
            create: '/teams/create',
            id: (id: string | number | null):string => '/teams/'+(id ? id : ':id'),
        },
        meetings: {
            id: (id: string | number | null):string => '/meeting/'+(id ? id : ':id'),
        }
    },
    SESSION_ID: 'session_id',
    BASE_SELECTOR: '#application'
};

export default CONST;
