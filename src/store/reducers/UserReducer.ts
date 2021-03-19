import { LOGIN, LOGOUT } from 'Actions/User/UserActionTypes';
import { IUserAction } from 'Actions/User/UserActions';

type StateType = {
    isAuthenticated: boolean | null;
}

const initialState: StateType = {
    isAuthenticated: false
}

export default function userReducer(state: StateType = initialState, action: IUserAction): StateType {
    switch (action.type) {
    case LOGIN:
        return { ...state, isAuthenticated: true };
    case LOGOUT:
        return { isAuthenticated: false };
    }
    return state;
}
