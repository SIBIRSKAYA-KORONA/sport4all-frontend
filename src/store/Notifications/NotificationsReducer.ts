import {
    SET_NOTIFICATIONS,
    ADD_NOTIFICATION,
    MARK_AS_READ,
    DELETE_NOTIFICATIONS,
    SET_LOADING
} from './NotificationsActionTypes';
import {INotificationActionReturn} from './NotificationsActions';
import {initialState, INotificationsState} from './NotificationsState';

export default function notificationsReducer(state: INotificationsState = initialState, action: INotificationActionReturn)
    : INotificationsState {
    switch (action.type) {

        case SET_LOADING:
            return {...state, isLoading: action.isLoading};

        case SET_NOTIFICATIONS:
            return {...state, isLoading: false, notifications: action.notifications};

        case ADD_NOTIFICATION:
            return {...state, notifications: [...state.notifications, action.notification]};

        case MARK_AS_READ:
            const notificationsRead = state.notifications.map(
                notification => ({...notification, isRead: true})
            );
            return {...state, notifications: notificationsRead};

        case DELETE_NOTIFICATIONS:
            return {...state, notifications: []};
    }
    return state;
}
