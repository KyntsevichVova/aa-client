import { actionName, createAction } from '../createAction';

const an = actionName('subscriptions');

export const SET_PAGE = an('SET_PAGE');
export const setPage = createAction(SET_PAGE);

export const SET_PAGE_SIZE = an('SET_PAGE_SIZE');
export const setPageSize = createAction(SET_PAGE_SIZE);

export const SET_ITEMS = an('SET_ITEMS');
export const setItems = createAction(SET_ITEMS);

export const SET_TOTAL = an('SET_TOTAL');
export const setTotal = createAction(SET_TOTAL);

export const FETCH_ALL = an('FETCH_ALL');
export const fetchAll = createAction(FETCH_ALL);

export const SUBSCRIBE = an('SUBSCRIBE');
export const subscribe = createAction(SUBSCRIBE);

export const UNSUBSCRIBE = an('UNSUBSCRIBE');
export const unsubscribe = createAction(UNSUBSCRIBE);