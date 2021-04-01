import { LOGIN, LOGOUT, SET_USER } from './UserActionTypes';
import { IUserActionReturn } from './UserActions';
import { initialState, IUserState } from './UserState';

export default function userReducer(state: IUserState = initialState, action: IUserActionReturn): IUserState {
    switch (action.type) {
    case LOGIN:     return { ...state, isAuthenticated: true };
    case LOGOUT:    return { isAuthenticated: false, user: null };
    case SET_USER:  return { isAuthenticated: true, user: action.user };
    }
    return state;
}
