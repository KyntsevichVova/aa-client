import { createAction, actionName } from '../createAction';

const an = actionName('menu');

export const SET_SELECTED = an('SET_SELECTED');
export const setSelected = createAction(SET_SELECTED);

export const SELECT = an('SELECT');
export const select = createAction(SELECT);