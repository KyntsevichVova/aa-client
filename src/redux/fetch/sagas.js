import { call, put, takeEvery } from "redux-saga/effects";
import { actions } from '../../redux';
import { REQUEST } from "./actions";

export function* fetchRequestSaga(action) {
    const { method, url, params } = action.payload;
    yield put(actions.status.setLoading({ loading: true }));
    const response = yield call(method, url, params);
    if (response.status === 401) {
        yield put(actions.status.setAuthorized({ authorized: false }));
        yield put(actions.status.setLoading({ loading: false }));
    }
    yield put(actions.status.setLoading({ loading: false }));
    return response;
}

export function* fetchRootWatcher() {
    yield takeEvery(REQUEST, fetchRequestSaga);
}