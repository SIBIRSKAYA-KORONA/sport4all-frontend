import { User } from 'Utils/types';

export type UserAuthenticatedType = boolean | null;
export type UserType = User | null;

export type IUserState = {
    // true - is authenticated (logged in)
    // false - not authenticated (logged out)
    // null - we don't know (maybe session exists on the backend)
    isAuthenticated: UserAuthenticatedType,
    user: UserType
}

export const initialState: IUserState = {
    isAuthenticated: null,
    user: null
}
