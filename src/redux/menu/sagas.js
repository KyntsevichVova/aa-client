import { put, takeLatest } from 'redux-saga/effects';
import { SELECT, setSelected} from './actions';

function* setSelectedSaga(action) {
    yield put(setSelected(action.payload));
}

export function* menuRootWatcher() {
    yield takeLatest(SELECT, setSelectedSaga);
}