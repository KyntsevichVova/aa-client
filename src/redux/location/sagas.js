import { takeLatest, call, apply } from 'redux-saga/effects';
import { PUSH_LOCATION, REPLACE_LOCATION, CHECK_LOCATION } from './actions';

function* pushLocationSaga(action) {
    yield apply(window.history, window.history.pushState, [{}, '', '/#' + action.payload.location]);
}

function* replaceLocationSaga(action) {
    yield apply(window.history, window.history.replaceState, [{}, '', '/#' + action.payload.location]);
}

const locationRegs = [
    /^#\/$/,
    /^#\/kek$/,
];

function* checkLocationSaga(action) {
    const location = window.location.hash;
    const correct = locationRegs.some((rx) => rx.test(location));
    if (correct) {
        return;
    } else {
        yield call(replaceLocationSaga, {
            payload: {
                location: '/'
            }
        });
    }
}

export function* locationRootWatcher() {
    yield takeLatest(PUSH_LOCATION, pushLocationSaga);
    yield takeLatest(REPLACE_LOCATION, replaceLocationSaga);
    //yield takeLatest(CHECK_LOCATION, checkLocationSaga);
}