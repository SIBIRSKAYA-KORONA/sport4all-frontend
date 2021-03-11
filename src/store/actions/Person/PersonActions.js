import * as types from 'Actions/Person/PersonActionTypes';

export const addPerson = (person) => ({ type: types.ADD_PERSON, person });
export const removePerson = (person) => ({ type: types.REMOVE_PERSON, person });
export const loadPersons = (persons) => ({ type: types.LOAD_PERSONS, persons });
export const clearPersons = () => ({ type: types.CLEAR_PERSONS });
