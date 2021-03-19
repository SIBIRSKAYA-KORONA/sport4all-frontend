import { combineReducers } from 'redux';
import teamsReducer from 'Reducers/Team';
import userReducer from 'Reducers/UserReducer';

const reducer = combineReducers({
    teams: teamsReducer,
    user: userReducer
});

export default reducer;
