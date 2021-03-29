import { User } from 'Utils/types';
import * as types from './UserActionTypes';
import { UserActionType } from './UserActionTypes';

export type IUserActionReturn = {
    type: UserActionType,
    user?: User
};
export type IUserAction = (
    user?:User
) => IUserActionReturn;

export const loginUser:IUserAction = ():IUserActionReturn => ({ type: types.LOGIN });
export const logoutUser:IUserAction = ():IUserActionReturn => ({ type: types.LOGOUT });
export const setUser:IUserAction = (user:User):IUserActionReturn => ({ type: types.SET_USER, user: user });
