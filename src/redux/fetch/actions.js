import { actionName, createAction } from '../createAction';

const an = actionName('fetch');

export const REQUEST = an('REQUEST');

export const request = createAction(REQUEST);