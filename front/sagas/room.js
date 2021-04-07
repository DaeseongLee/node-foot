import { all, call, fork, delay, put, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';
import {
    MAKE_ROOM_FAILURE,
    MAKE_ROOM_SUCCESS,
    MAKE_ROOM_REQUEST,
    LOAD_ROOMLIST_REQUEST,
    LOAD_ROOMLIST_SUCCESS,
    LOAD_ROOMLIST_FAILURE,
    LOAD_ROOMDETAIL_REQUEST,
    LOAD_ROOMDETAIL_SUCCESS,
    LOAD_ROOMDETAIL_FAILURE,
} from '../reducers/room';


function loadRoomListAPI() {
    return axios.get('/room');
}

function makeRoomAPI(data) {
    return axios.post('/room', data);
}



function roomDetailAPI(data) {
    return axios.post('/room/roomDetail', data);
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

function* roomDetail(action) {
    try {
        const result = yield call(roomDetailAPI, action.data);
        yield put({
            type: LOAD_ROOMDETAIL_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_ROOMDETAIL_FAILURE,
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

function* watchRoomDetail() {
    yield takeLatest(LOAD_ROOMDETAIL_REQUEST, roomDetail);
}

export default function* roomSaga() {
    yield all([
        fork(watchMake),
        fork(watchRoomList),
        fork(watchRoomDetail),
    ])
}