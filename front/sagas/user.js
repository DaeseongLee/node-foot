import { all, call, delay, put, takeLatest, fork } from "@redux-saga/core/effects"
import axios from 'axios';
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UPLOAD_USERIMAGE_REQUEST,
    UPLOAD_USERIMAGE_SUCCESS,
    UPLOAD_USERIMAGE_FAILURE,
    UPLOAD_REQUEST,
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
} from '../reducers/user';


function loginAPI(data) {
    return axios.post('/user/login', data);
}


function logOutAPI() {
    return axios.post('/user/logout');
}


function signUpAPI(data) {
    return axios.post('/user', data);
}

function uploadImageAPI() {
    return axios.post('/api/uploadImage');
}

function uploadAPI() {
    return axios.post('/api/upload');
}

function* logIn(action) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    } catch (error) {
        yield put({
            type: LOG_IN_FAILURE,
            error: error.response.data,
        })
    }
}


function* logOut(action) {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: LOG_OUT_FAILURE,
            error: error.response.data,
        })
    }
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: SIGN_UP_FAILURE,
            error: error.response.data,
        })
    }
}

function* uploadImage(action) {
    try {
        // const result = yield call(uploadImageAPI, action.data);
        yield delay(1000);
        console.log('sagaUploadImage', action.data);
        yield put({
            type: UPLOAD_USERIMAGE_SUCCESS,
            data: action.data,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: UPLOAD_USERIMAGE_FAILURE,
            error: error.response.data,
        })
    }
}

function* upload(action) {
    try {
        // const result = yield call(uploadAPI, action.data);
        yield delay(1000);
        yield put({
            type: UPLOAD_SUCCESS,
            data: action.data,
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: UPLOAD_FAILURE,
            error: error.response.data,
        })
    }
}


function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchImageUp() {
    yield takeLatest(UPLOAD_USERIMAGE_REQUEST, uploadImage);
}

function* watchUpload() {
    yield takeLatest(UPLOAD_REQUEST, upload);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchImageUp),
        fork(watchUpload),
    ])
}