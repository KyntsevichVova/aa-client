import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API } from '../../lib/api';
import { actions, selectors } from '../../redux';
import { request } from '../fetch/actions';
import { fetchRequestSaga } from '../fetch/sagas';
import { CHECK_AUTH, SIGN_IN, SIGN_OUT, SIGN_UP } from './actions';

const locationRegs = [
    /^#\/$/,
    /^#\/articles\/\d+$/,
    /^#\/authors$/,
    /^#\/authors\/\d+$/,
    /^#\/signin$/,
    /^#\/signup$/,
];

function* checkLocationAuthorizedSaga() {
    const location = window.location.hash;
    const correct = locationRegs.some((rx) => rx.test(location));
    if (!correct)
        yield put(actions.location.pushLocation({ location: '/' }));
}

function* signInSaga(action) {
    const auth = yield select(selectors.auth.selectAuth);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = yield call(fetchRequestSaga, request({
        method: API.post,
        url: '/signin',
        params: {
            body: JSON.stringify(auth),
            credentials: 'include',
            headers,
        },
    }));
    if (response.ok) {
        yield put(actions.status.setAuthorized({ authorized: true }));
    } else {
        yield put(actions.status.setAuthorized({ authorized: false })); 
    }
}

function* signUpSaga(action) {
    const auth = yield select(selectors.auth.selectAuth);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = yield call(fetchRequestSaga, request({
        method: API.post,
        url: '/signup',
        params: {
            body: JSON.stringify(auth),
            credentials: 'include',
            headers,
        },
    }));
    if (response.ok) {
        yield put(actions.status.setAuthorized({ authorized: true }));
    } else {
        yield put(actions.status.setAuthorized({ authorized: false })); 
    }
}

function* signOutSaga(action) {
    yield call(fetchRequestSaga, request({
        method: API.post,
        url: '/signout',
        params: {
            credentials: 'include',
        },
    }));
    yield put(actions.status.setAuthorized({ authorized: false }));
    yield call(checkLocationAuthorizedSaga);
}

function* checkAuthSaga() {
    const response = yield call(fetchRequestSaga, request({
        method: API.get,
        url: '/api/v1/self',
        params: {
            credentials: 'include',
        },
    }));
    if (response.status === 401 || !response.ok) {
        yield put(actions.status.setAuthorized({ authorized: false }));
        yield call(checkLocationAuthorizedSaga);
    } else {
        yield put(actions.status.setAuthorized({ authorized: true }));
    }
}

export function* authRootWatcher() {
    yield takeEvery(SIGN_IN, signInSaga);
    yield takeEvery(SIGN_UP, signUpSaga);
    yield takeEvery(SIGN_OUT, signOutSaga);
    yield takeEvery(CHECK_AUTH, checkAuthSaga);
}