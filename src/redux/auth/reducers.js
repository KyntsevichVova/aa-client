import { SET_AUTH, SET_EMAIL, SET_PASSWORD, SET_ERROR } from "./actions";

export const initState = {
    email: "",
    password: "",
    error: "",
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload.email,
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
            }
        case SET_AUTH:
            return {
                ...state,
                ...action.payload.auth,
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload.error,
            }
        default:
            return state;
    }
}