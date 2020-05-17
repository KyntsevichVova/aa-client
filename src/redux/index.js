import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as actions from './actions';
import { registerSagas } from './registerSagas';
import * as selectors from './selectors';
import { reducer, initState } from './reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        maxAge: 150,
    })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(
    reducer,
    initState,
    enhancer,
);

registerSagas(sagaMiddleware);

store.dispatch(actions.auth.checkAuth());

export { actions, selectors, store, };
