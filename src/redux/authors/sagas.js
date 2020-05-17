import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions } from '..';
import { API } from '../../lib/api';
import { request } from '../fetch/actions';
import { fetchRequestSaga } from '../fetch/sagas';
import { FETCH_ALL, FETCH_ONE, setItems, setOne, setTotal } from './actions';
import { selectAuthors } from './selectors';

function* fetchAllAuthorsSaga(action) {
    const authors = yield select(selectAuthors);
    const searchParams = new URLSearchParams();
    searchParams.append('query', authors.search);
    searchParams.append('offset', authors.page * authors.pageSize);
    searchParams.append('limit', authors.pageSize);
    const response = yield call(fetchRequestSaga, request({
        method: API.get,
        url: '/api/v1/authors',
        params: {
            searchParams,
        },
    }));
    let data = authors;
    if (response.ok) {
        data = yield response.json();
    }
    yield put(setItems({
        items: data.authors,
    }));
    yield put(setTotal({
        total: data.total,
    }));
}

function* fetchOneAuthorSaga(action) {
    const response = yield call(fetchRequestSaga, request({
        method: API.get,
        url: `/api/v1/articles/${action.payload.id}`,
        params: {},
    }));
    let data = {};
    if (response.ok) {
        data = yield response.json();
        yield put(setOne({
            one: data,
        }));
    } else {
        yield put(actions.location.pushLocation({
            location: '/',
        }));
    }
}

export function* authorsRootWatcher() {
    yield takeEvery(FETCH_ALL, fetchAllAuthorsSaga);
    yield takeEvery(FETCH_ONE, fetchOneAuthorSaga);
}