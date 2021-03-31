import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import roomSaga from './room';

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(roomSaga),
    ]);
}