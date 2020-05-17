import { apply, takeLatest } from 'redux-saga/effects';
import { PUSH_LOCATION, REPLACE_LOCATION } from './actions';

function* pushLocationSaga(action) {
    yield apply(window.history, window.history.pushState, [{}, '', '/#' + action.payload.location]);
}

function* replaceLocationSaga(action) {
    yield apply(window.history, window.history.replaceState, [{}, '', '/#' + action.payload.location]);
}

export function* locationRootWatcher() {
    yield takeLatest(PUSH_LOCATION, pushLocationSaga);
    yield takeLatest(REPLACE_LOCATION, replaceLocationSaga);
}