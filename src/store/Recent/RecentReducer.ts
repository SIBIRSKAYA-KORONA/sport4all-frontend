import RecentActionTypes from './RecentActionTypes';
import { IRecentActionType } from './RecentActions';
import { initialState, IRecentState } from './RecentState';

export default function recentReducer(state: IRecentState = initialState, action: IRecentActionType): IRecentState {
    let prev = {...state};
    let array, entity;
    switch (action.type) {
    case RecentActionTypes.ADD_RECENT_TEAM:         array = 'teams';    entity = 'team';    break;
    case RecentActionTypes.ADD_RECENT_USER:         array = 'users';    entity = 'user';    break;
    case RecentActionTypes.ADD_RECENT_TOURNAMENT:   array = 'tours';    entity = 'tour';    break;
    case RecentActionTypes.RESET_RECENT:            prev = initialState;                    break;
    }

    if (array && prev[array] && entity && action[entity]) {
        if (!prev[array].find(item => item['id'] === action[entity]['id']))
            prev[array].unshift(action[entity]);
        prev[array] = prev[array].slice(0,5);
    }

    return prev;
}
