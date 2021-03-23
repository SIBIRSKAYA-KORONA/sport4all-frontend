import { LOGIN, LOGOUT } from './UserActionTypes';
import { IUserActionReturn } from './UserActions';
import { initialState, IUserState } from './UserState';

export default function userReducer(state: IUserState = initialState, action: IUserActionReturn): IUserState {
    switch (action.type) {
    case LOGIN:
        return { ...state, isAuthenticated: true };
    case LOGOUT:
        return { ...state, isAuthenticated: false };
    }
    return state;
}
