const CONST = {
    PATHS: {
        login: '/login',
        signup: '/signup',
        profile: '/profile',
        teams: {
            base: '/teams',
            create: '/teams/create',
            id: (id: string | number | null):string => '/teams/'+(id ? id : ':id'),
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
