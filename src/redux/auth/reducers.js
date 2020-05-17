import { SET_AUTH, SET_EMAIL, SET_PASSWORD } from "./actions";

export const initState = {
    email: "",
    password: "",
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
        default:
            return state;
    }
}