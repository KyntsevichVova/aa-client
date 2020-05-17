import { actionName, createAction } from '../createAction';

const an = actionName('auth');

export const SIGN_IN = an('SIGN_IN');

export const signIn = createAction(SIGN_IN);

export const SIGN_UP = an('SIGN_UP');

export const signUp = createAction(SIGN_UP);

export const SIGN_OUT = an('SIGN_OUT');

export const signOut = createAction(SIGN_OUT);

export const SET_EMAIL = an('SET_EMAIL');

export const setEmail = createAction(SET_EMAIL);

export const SET_PASSWORD = an('SET_PASSWORD');

export const setPassword = createAction(SET_PASSWORD);

export const CHECK_AUTH = an('CHECK_AUTH');

export const checkAuth = createAction(CHECK_AUTH);