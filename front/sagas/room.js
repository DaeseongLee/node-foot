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
    JOIN_ROOM_REQUEST,
    JOIN_ROOM_SUCCESS,
    JOIN_ROOM_FAILURE,
    EXIT_ROOM_REQUEST,
    EXIT_ROOM_SUCCESS,
    EXIT_ROOM_FAILURE,
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

function roomJoinAPI(data) {
    return axios.post('/room/roomJoin', data);
}

function roomExitAPI(data) {
    return axios.post('/room/roomExit', data);
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

function* roomJoin(action) {
    try {
        const result = yield call(roomJoinAPI, action.data);
        yield put({
            type: JOIN_ROOM_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: JOIN_ROOM_FAILURE,
            error: error.response.data,
        })
    }
}


function* roomExit(action) {
    try {
        yield call(roomExitAPI, action.data);
        yield put({
            type: EXIT_ROOM_SUCCESS,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: EXIT_ROOM_FAILURE,
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

function* watchRoomJoin() {
    yield takeLatest(JOIN_ROOM_REQUEST, roomJoin);
}

function* watchRoomExit() {
    yield takeLatest(EXIT_ROOM_REQUEST, roomExit);
}

export default function* roomSaga() {
    yield all([
        fork(watchMake),
        fork(watchRoomList),
        fork(watchRoomDetail),
        fork(watchRoomJoin),
        fork(watchRoomExit),
    ])
}