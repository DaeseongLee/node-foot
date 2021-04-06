import { all, call, fork, delay, put, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';
import {
    MAKE_ROOM_FAILURE,
    MAKE_ROOM_SUCCESS,
    MAKE_ROOM_REQUEST,
    LOAD_ROOMLIST_REQUEST,
    LOAD_ROOMLIST_SUCCESS,
    LOAD_ROOMLIST_FAILURE
} from '../reducers/room';


function loadRoomListAPI() {
    return axios.get('/room');
}

function makeRoomAPI(data) {
    return axios.post('/room', data);
}


function* loadRoomList() {
    try {
        const result = yield call(loadRoomListAPI);
        yield put({
            type: LOAD_ROOMLIST_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_ROOMLIST_FAILURE,
            error: error.response.data,
        })
    }
}

function* makeRoom(action) {
    try {
        const result = yield call(makeRoomAPI, action.data);
        yield put({
            type: MAKE_ROOM_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: MAKE_ROOM_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchRoomList() {
    yield takeLatest(LOAD_ROOMLIST_REQUEST, loadRoomList);
}

function* watchMake() {
    yield takeLatest(MAKE_ROOM_REQUEST, makeRoom);
}

export default function* roomSaga() {
    yield all([
        fork(watchMake),
        fork(watchRoomList),
    ])
}