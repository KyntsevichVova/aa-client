import { call, put, takeEvery } from "redux-saga/effects";
import { status } from '../actions';
import { REQUEST } from "./actions";

export function* fetchRequestSaga(action) {
    const { method, url, params } = action.payload;
    yield put(status.setLoading({ loading: true }));
    const response = yield call(method, url, params);
    if (response.status === 401) {
        yield put(status.setAuthorized({ authorized: false }));
        yield put(status.setLoading({ loading: false }));
    }
    yield put(status.setLoading({ loading: false }));
    return response;
}

export function* fetchRootWatcher() {
    yield takeEvery(REQUEST, fetchRequestSaga);
}