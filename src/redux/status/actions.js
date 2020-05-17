import { actionName, createAction } from '../createAction';

const an = actionName('status');

export const SET_AUTHORIZED = an('SET_AUTHORIZED');

export const setAuthorized = createAction(SET_AUTHORIZED);

export const SET_LOADING = an('SET_LOADING');

export const setLoading = createAction(SET_LOADING);