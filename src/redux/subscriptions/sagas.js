import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API } from '../../lib/api';
import { request } from '../fetch/actions';
import { fetchRequestSaga } from '../fetch/sagas';
import { FETCH_ALL, setItems, setTotal, SUBSCRIBE, UNSUBSCRIBE } from './actions';
import { selectSubscriptions } from './selectors';

function* fetchAllSubscriptionsSaga(action) {
    const subscriptions = yield select(selectSubscriptions);
    const searchParams = new URLSearchParams();
    searchParams.append('page', subscriptions.page);
    searchParams.append('pageSize', subscriptions.pageSize);
    const response = yield call(fetchRequestSaga, request({
        method: API.get,
        url: '/api/v1/subscriptions',
        params: {
            searchParams,
            credentials: 'include',
        },
    }));
    let data = subscriptions;
    if (response.ok) {
        data = yield response.json();
    }
    yield put(setItems({
        items: data.subscriptions,
    }));
    yield put(setTotal({
        total: data.total,
    }));
}

function* subscribeSaga(action) {
    yield call(fetchRequestSaga, request({
        method: API.post,
        url: `/api/v1/subscribe/${action.payload.id}`,
        params: {
            credentials: 'include',
        },
    }));
    yield call(fetchAllSubscriptionsSaga);
}

function* unsubscribeSaga(action) {
    yield call(fetchRequestSaga, request({
        method: API.post,
        url: `/api/v1/unsubscribe/${action.payload.id}`,
        params: {
            credentials: 'include',
        },
    }));
    yield call(fetchAllSubscriptionsSaga);
}

export function* subscriptionsRootWatcher() {
    yield takeEvery(FETCH_ALL, fetchAllSubscriptionsSaga);
    yield takeEvery(SUBSCRIBE, subscribeSaga);
    yield takeEvery(UNSUBSCRIBE, unsubscribeSaga);
}