import { combineReducers } from 'redux';
import { initState as menuState, reducer as menuReducer } from './menu';
import { initState as locationState, reducer as locationReducer } from './location';

const reducer = combineReducers({
    menu: menuReducer,
    location: locationReducer,
});

const initState = {
    menu: menuState,
};

export { reducer, initState };
