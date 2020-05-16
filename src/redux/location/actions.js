import { actionName, createAction } from '../createAction';

const an = actionName('location');

export const PUSH_LOCATION = an('PUSH_LOCATION');

export const pushLocation = createAction(PUSH_LOCATION);

export const REPLACE_LOCATION = an('REPLACE_LOCATION');

export const replaceLocation = createAction(REPLACE_LOCATION);

export const CHECK_LOCATION = an('CHECK_LOCATION');

export const checkLocation = createAction(CHECK_LOCATION);