import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API } from '../../lib/api';
import { request } from '../fetch/actions';
import { fetchRequestSaga } from '../fetch/sagas';
import { FETCH_ALL, setItems, setTotal } from './actions';
import { selectNotifications } from './selectors';

function* fetchAllNotificationsSaga(action) {
    const notifications = yield select(selectNotifications);
    const searchParams = new URLSearchParams();
    searchParams.append('page', notifications.page);
    searchParams.append('pageSize', notifications.pageSize);
    const response = yield call(fetchRequestSaga, request({
        method: API.get,
        url: '/api/v1/notifications',
        params: {
            searchParams,
            credentials: 'include',
        },
    }));
    let data = notifications;
    if (response.ok) {
        data = yield response.json();
    }
    yield put(setItems({
        items: data.notifications,
    }));
    yield put(setTotal({
        total: data.total,
    }));
    yield call(setViewedSaga);
}

function* setViewedSaga(action) {
    const notifications = yield select(selectNotifications);
    const ids = notifications.items.filter((n) => !n.viewed).map((n) => n.id);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    yield call(fetchRequestSaga, request({
        method: API.post,
        url: '/api/v1/notifications/view',
        params: {
            body: JSON.stringify(ids),
            credentials: 'include',
            headers,
        },
    }));
}

export function* notificationsRootWatcher() {
    yield takeEvery(FETCH_ALL, fetchAllNotificationsSaga);
}