import { all, call, fork, delay, put, takeLatest } from '@redux-saga/core/effects';
import { MAKE_ROOM_FAILURE, MAKE_ROOM_SUCCESS, MAKE_ROOM_REQUEST } from '../reducers/room';

function makeRoomAPI(data) {
    return axios.post('/api/room');
}

function* makeRoom(action) {
    console.log('makeRoom', action);
    try {
        // const result = yield call(makeRoomAPI, action.data);
        yield delay(1000);
        yield put({
            type: MAKE_ROOM_SUCCESS,
            data: action.data,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: MAKE_ROOM_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchMake() {
    yield takeLatest(MAKE_ROOM_REQUEST, makeRoom);
}
export default function* roomSaga() {
    yield all([
        fork(watchMake),
    ])
}