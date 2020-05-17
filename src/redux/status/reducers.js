import { SET_AUTHORIZED, SET_LOADING } from "./actions";

export const initState = {
    authorized: false,
    loading: false,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case SET_AUTHORIZED:
            return {
                ...state,
                authorized: action.payload.authorized,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
            }
        default:
            return state;
    }
}