import {
    SET_NOTIFICATIONS,
    ADD_NOTIFICATION,
    MARK_AS_READ,
    DELETE_NOTIFICATIONS,
} from './NotificationsActionTypes';
import {INotificationActionReturn} from './NotificationsActions';
import {initialState, INotificationsState} from './NotificationsState';

export default function notificationsReducer(state: INotificationsState = initialState, action: INotificationActionReturn)
    : INotificationsState {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return {...state, notifications: action.notifications};

        case ADD_NOTIFICATION:
            return {...state, notifications: [action.notification, ...state.notifications]};

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
