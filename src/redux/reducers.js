import { combineReducers } from 'redux';
import { initState as articlesState, reducer as articlesReducer } from './articles';
import { initState as authState, reducer as authReducer } from './auth';
import { reducer as locationReducer } from './location';
import { initState as menuState, reducer as menuReducer } from './menu';
import { initState as statusState, reducer as statusReducer } from './status';
import { initState as notificationsState, reducer as notificationsReducer } from './notifications';
import { initState as subscriptionsState, reducer as subscriptionsReducer } from './subscriptions';
import { initState as authorsState, reducer as authorsReducer } from './authors';

const reducer = combineReducers({
    menu: menuReducer,
    location: locationReducer,
    articles: articlesReducer,
    status: statusReducer,
    auth: authReducer,
    notifications: notificationsReducer,
    subscriptions: subscriptionsReducer,
    authors: authorsReducer,
});

const initState = {
    menu: menuState,
    articles: articlesState,
    status: statusState,
    auth: authState,
    notifications: notificationsState,
    subscriptions: subscriptionsState,
    authors: authorsState,
};

export { reducer, initState };
