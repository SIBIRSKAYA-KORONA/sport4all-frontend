export type UserAuthenticatedType = boolean | null;

export type IUserState = {
    // true - is authenticated (logged in)
    // false - not authenticated (logged out)
    // null - we don't know (maybe session exists on the backend)
    isAuthenticated: UserAuthenticatedType
}

export const initialState: IUserState = {
    isAuthenticated: null
}
