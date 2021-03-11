import { combineReducers } from 'redux';
import personsReducer from './Person';
import teamsReducer from 'Reducers/Team';

const reducer = combineReducers({
    persons: personsReducer,
    teams: teamsReducer
});

export default reducer;
