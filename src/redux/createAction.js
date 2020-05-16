export const createAction = (type) => (payload) => ({ type, payload });

export const actionName = (name) => (type) => `${name}.${type}`;