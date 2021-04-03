import {Notification} from "Utils/types";

export type INotificationsState = {
    isLoading: boolean,
    notifications: Notification[],
}

export const initialState: INotificationsState = {
    isLoading: true,
    notifications: []
}
