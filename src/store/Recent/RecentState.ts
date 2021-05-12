import { Team, Tournament, User } from 'Utils/types';

export type IRecentState = {
    teams: Team[],
    users: User[],
    tours: Tournament[],
}

export const initialState: IRecentState = {
    teams: [],
    users: [],
    tours: [],
}
