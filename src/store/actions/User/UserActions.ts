import * as types from 'Actions/User/UserActionTypes';
import {UserActionType} from 'Actions/User/UserActionTypes';

export type IUserAction = {
    type: UserActionType
};

export const loginUser = ():IUserAction => ({ type: types.LOGIN });
export const logoutUser = ():IUserAction => ({ type: types.LOGOUT });
