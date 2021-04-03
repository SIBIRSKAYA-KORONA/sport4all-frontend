import {Notification} from 'Utils/types';
import * as types from './NotificationsActionTypes';
import {NotificationActionType} from './NotificationsActionTypes';

export type INotificationActionReturn = {
    type: NotificationActionType,
    notification?: Notification,
    notifications?: Notification[],
    isLoading?: boolean,
};

export const setLoading = (isLoading): INotificationActionReturn => ({type: types.SET_LOADING, isLoading});
export const setNotifications = (notifications): INotificationActionReturn => ({type: types.SET_NOTIFICATIONS, notifications});
export const addNotification = (notification): INotificationActionReturn => ({type: types.ADD_NOTIFICATION, notification});
export const markAsRead = (notification): INotificationActionReturn => ({type: types.MARK_AS_READ, notification});
export const deleteNotifications = (): INotificationActionReturn => ({type: types.DELETE_NOTIFICATIONS});
