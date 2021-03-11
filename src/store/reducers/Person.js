import * as types from 'Actions/Person/PersonActionTypes';

const initialState = [];

function personsReducer(state = initialState, action) {
    let newState = [...state];

    switch (action.type) {
    case types.ADD_PERSON:
        newState.push(action.person);
        break;
    case types.LOAD_PERSONS:
        newState = action.persons;
        break;
    case types.REMOVE_PERSON:
        newState = newState.filter(p => p.name !== action.person.name && p.surname !== action.person.surname);
        break;
    case types.CLEAR_PERSONS:
        newState = [];
        break;
    }

    return newState;
}

export default personsReducer;
