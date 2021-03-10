import { combineReducers } from 'redux';
import personsReducer from './Person';

const reducer = combineReducers({
    persons: personsReducer,
});

export default reducer;
