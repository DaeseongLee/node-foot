import { all, call, delay, put, takeLatest, fork } from "@redux-saga/core/effects"

import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
} from '../reducers/user';

function signUpAPI() {
    return axios.post('/api/signUp');
}

function loginAPI() {
    return axios.post('/api/user');
}


function* signUp() {
    try {
        // const result = yield call(signUp);
        yield delay(1000);
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


function* logIn(action) {
    console.log('saga>user>login>action', action);
    try {
        // yield call(loginAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: LOG_IN_FAILURE,
            error: error.response.data,
        })
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchSignUp),

    ])
}