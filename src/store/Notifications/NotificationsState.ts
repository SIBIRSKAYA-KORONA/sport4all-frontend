import {Notification} from "Utils/types";

export type INotificationsState = {
    notifications: Notification[],
}

export const initialState: INotificationsState = {
    notifications: []
}
