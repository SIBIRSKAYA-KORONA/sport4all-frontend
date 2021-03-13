import * as types from 'Actions/User/UserActionTypes'

const initialState = {
    nickname: '',
};

function userReducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
    case types.CREATE_USER:
        newState = action.user;
        break;
    }

    return newState;
}

export default userReducer;
