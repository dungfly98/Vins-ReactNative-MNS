import ACTIOM_TYPES from '../actions/ActionTypes';
const defaultState = {
    name: 'REDUX'
}

const ChangeNameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIOM_TYPES.CHANGE_NAME:
            return state
        default:
            return state;
    }
}

export default ChangeNameReducer;