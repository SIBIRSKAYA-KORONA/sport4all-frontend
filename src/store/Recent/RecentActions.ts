import { Team, Tournament, User } from 'Utils/types';
import RecentActionTypes  from './RecentActionTypes';

export type IRecentActionType = {
    type: RecentActionTypes,
    team?: Team,
    user?: User,
    tour?: Tournament,
};

export const addRecentTeam = (team:Team):IRecentActionType => ({ type: RecentActionTypes.ADD_RECENT_TEAM, team: team });
export const addRecentUser = (user:User):IRecentActionType => ({ type: RecentActionTypes.ADD_RECENT_USER, user: user });
export const addRecentTour = (tour:Tournament):IRecentActionType => ({ type: RecentActionTypes.ADD_RECENT_TOURNAMENT, tour: tour });
export const resetRecent = ():IRecentActionType => ({ type: RecentActionTypes.RESET_RECENT });
