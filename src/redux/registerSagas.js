import { sagas as location } from './location';
import { sagas as menu } from './menu';

export const registerSagas = (sagaMiddleware) => {
    sagaMiddleware.run(menu.menuRootWatcher);
    sagaMiddleware.run(location.locationRootWatcher);
}