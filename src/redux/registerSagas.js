import { sagas as articles } from './articles';
import { sagas as auth } from './auth';
import { sagas as authors } from './authors';
import { sagas as fetch } from './fetch';
import { sagas as location } from './location';
import { sagas as menu } from './menu';
import { sagas as notifications } from './notifications';
import { sagas as subscriptions } from './subscriptions';

export const registerSagas = (sagaMiddleware) => {
    sagaMiddleware.run(menu.menuRootWatcher);
    sagaMiddleware.run(location.locationRootWatcher);
    sagaMiddleware.run(fetch.fetchRootWatcher);
    sagaMiddleware.run(articles.articlesRootWatcher);
    sagaMiddleware.run(auth.authRootWatcher);
    sagaMiddleware.run(authors.authorsRootWatcher);
    sagaMiddleware.run(notifications.notificationsRootWatcher);
    sagaMiddleware.run(subscriptions.subscriptionsRootWatcher);
}