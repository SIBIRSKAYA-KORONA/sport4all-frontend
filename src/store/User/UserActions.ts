import * as types from './UserActionTypes';
import {UserActionType} from './UserActionTypes';

export type IUserAction = {
    type: UserActionType
};

export const loginUser = ():IUserAction => ({ type: types.LOGIN });
export const logoutUser = ():IUserAction => ({ type: types.LOGOUT });
