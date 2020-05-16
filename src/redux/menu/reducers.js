import * as menu from './actions';

const initState = {
    selected: '/',
};

function reducer(state = initState, action) {
    switch (action.type) {
        case menu.SET_SELECTED:
            return {
                ...state,
                selected: action.payload.selected
            };
        default:
            return state;
    }
}

export { reducer, initState };