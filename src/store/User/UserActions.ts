import * as types from './UserActionTypes';
import {UserActionType} from './UserActionTypes';

export type IUserActionReturn = {
    type: UserActionType
};
export type IUserAction = () => IUserActionReturn;

export const loginUser = ():IUserActionReturn => ({ type: types.LOGIN });
export const logoutUser = ():IUserActionReturn => ({ type: types.LOGOUT });
