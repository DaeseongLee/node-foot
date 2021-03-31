import { all, call, delay, put, takeLatest, fork } from "@redux-saga/core/effects"

import {
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
} from '../reducers/user';

function signUpAPI() {
    return axios.post('/api/signUp');
}

function* signUp() {
    try {
        // const result = yield call(signUpAPI);
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

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchSignUp),
    ])
}