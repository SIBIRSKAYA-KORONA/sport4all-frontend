export type IUserState = {
    isAuthenticated: boolean | null;
}

export const initialState: IUserState = {
    isAuthenticated: false
}
