import { combineReducers } from 'redux';
import { initState as articlesState, reducer as articlesReducer } from './articles';
import { initState as authState, reducer as authReducer } from './auth';
import { initState as authorsState, reducer as authorsReducer } from './authors';
import { initState as menuState, reducer as menuReducer } from './menu';
import { initState as notificationsState, reducer as notificationsReducer } from './notifications';
import { initState as statusState, reducer as statusReducer } from './status';
import { initState as subscriptionsState, reducer as subscriptionsReducer } from './subscriptions';

const reducer = combineReducers({
    articles: articlesReducer,
    auth: authReducer,
    authors: authorsReducer,
    menu: menuReducer,
    notifications: notificationsReducer,
    status: statusReducer,
    subscriptions: subscriptionsReducer,
});

const initState = {
    articles: articlesState,
    auth: authState,
    authors: authorsState,
    menu: menuState,
    notifications: notificationsState,
    status: statusState,
    subscriptions: subscriptionsState,
};

export { reducer, initState };