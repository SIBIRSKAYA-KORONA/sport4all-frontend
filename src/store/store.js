import { createStore, combineReducers } from 'redux';
import userReducer from 'Store/User/UserReducer';
import notificationsReducer from 'Store/Notifications/NotificationsReducer';

const reducer = combineReducers({
    user: userReducer,
    notifications: notificationsReducer
});

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
