import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API } from '../../lib/api';
import { request } from '../fetch/actions';
import { fetchRequestSaga } from '../fetch/sagas';
import { SIGN_IN, SIGN_UP, SIGN_OUT, CHECK_AUTH } from './actions';
import { location, status } from '../actions';
import { selectors } from '.';

function* signInSaga(action) {
    const auth = yield select(selectors.selectAuth);
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
        yield put(status.setAuthorized({ authorized: true }));
    } else {
        yield put(status.setAuthorized({ authorized: false })); 
    }
}

function* signUpSaga(action) {
    const auth = yield select(selectors.selectAuth);
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
        yield put(status.setAuthorized({ authorized: true }));
    } else {
        yield put(status.setAuthorized({ authorized: false })); 
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
    yield put(status.setAuthorized({ authorized: false }));
    yield put(location.pushLocation({ location: '/' }));
}

function* checkAuthSaga() {
    const response = yield call(fetchRequestSaga, request({
        method: API.post,
        url: '/api/v1/self',
        params: {
            credentials: 'include',
        },
    }));
    if (response.status === 401 || !response.ok) {
        yield put(status.setAuthorized({ authorized: false }));
    } else {
        yield put(status.setAuthorized({ authorized: true }));
    }
}

export function* authRootWatcher() {
    yield takeEvery(SIGN_IN, signInSaga);
    yield takeEvery(SIGN_UP, signUpSaga);
    yield takeEvery(SIGN_OUT, signOutSaga);
    yield takeEvery(CHECK_AUTH, checkAuthSaga);
}