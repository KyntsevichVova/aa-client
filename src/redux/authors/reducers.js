import { SET_ITEMS, SET_ONE, SET_PAGE, SET_PAGE_SIZE, SET_SEARCH, SET_TOTAL } from "./actions";

export const initState = {
    page: 0,
    pageSize: 10,
    search: '',
    items: [],
    total: 0,
    one: {},
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
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload.search,
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
        case SET_ONE:
            return {
                ...state,
                one: action.payload.one,
            }
        default:
            return state;
    }
}