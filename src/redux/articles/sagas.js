import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions } from '..';
import { API } from '../../lib/api';
import { request } from '../fetch/actions';
import { fetchRequestSaga } from '../fetch/sagas';
import { FETCH_ALL, FETCH_ONE, setItems, setOne, setTotal } from './actions';
import { selectors } from '../../redux';

function* fetchAllArticlesSaga(action) {
    const articles = yield select(selectors.articles.selectArticles);
    const searchParams = new URLSearchParams();
    searchParams.append('query', articles.search);
    searchParams.append('offset', articles.page * articles.pageSize);
    searchParams.append('limit', articles.pageSize);
    const response = yield call(fetchRequestSaga, request({
        method: API.get,
        url: '/api/v1/articles',
        params: {
            searchParams,
        },
    }));
    let data = articles;
    if (response.ok) {
        data = yield response.json();
    }
    yield put(setItems({
        items: data.articles,
    }));
    yield put(setTotal({
        total: data.total,
    }));
}

function* fetchOneArticleSaga(action) {
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

export function* articlesRootWatcher() {
    yield takeEvery(FETCH_ALL, fetchAllArticlesSaga);
    yield takeEvery(FETCH_ONE, fetchOneArticleSaga);
}