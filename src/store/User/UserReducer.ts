import { LOGIN, LOGOUT } from './UserActionTypes';
import { IUserAction } from './UserActions';
import { initialState, IUserState } from './UserState';

export default function userReducer(state: IUserState = initialState, action: IUserAction): IUserState {
    switch (action.type) {
    case LOGIN:
        return { ...state, isAuthenticated: true };
    case LOGOUT:
        return { isAuthenticated: false };
    }
    return state;
}
