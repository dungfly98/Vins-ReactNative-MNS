import { ACTION_TYPES } from './ActionTypes';

const changeNameAction = (name) => {
    return {
        type: ACTION_TYPES.changeNameAction,
        name
    }
}

const chanegNumberAction = (name) => {
    return {
        type: ACTION_TYPES.chanegNumberAction,
        name
    }
}
export { changeNameAction, chanegNumberAction };