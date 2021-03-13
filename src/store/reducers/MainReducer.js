import { combineReducers } from 'redux';
import personsReducer from 'Reducers/Person';
import teamsReducer from 'Reducers/Team';
import userReducer from 'Reducers/User';

const reducer = combineReducers({
    persons: personsReducer,
    teams: teamsReducer,
    user: userReducer
});

export default reducer;
