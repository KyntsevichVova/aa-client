import { SET_ITEMS, SET_PAGE, SET_PAGE_SIZE, SET_TOTAL } from "./actions";

export const initState = {
    page: 0,
    pageSize: 10,
    items: [],
    total: 0,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                page: action.payload.page,
            };
        case SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.payload.pageSize,
            }
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload.items,
            }
        case SET_TOTAL:
            return {
                ...state,
                total: action.payload.total,
            }
        default:
            return state;
    }
}