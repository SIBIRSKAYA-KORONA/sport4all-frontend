import * as types from 'Actions/Team/TeamActionTypes'

const initialState = [];

function teamsReducer(state = initialState, action) {
    let newState = [...state];

    switch (action.type) {
    case types.CREATE_TEAM:
        newState.push(action.team);
        break;
    }

    return newState;
}

export default teamsReducer;
