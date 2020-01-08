import { delay, } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { LOGIN_REQUEST } from './types';
import api from './api';

function login(email, password) {
    api.user.login({ email, password });
}

export function* helloSaga() {
    console.log('Hello Sagas!')
}

function* loginRequest(action) {
    const { email, password } = action;
    let data = yield call(login, email, password);
    console.log(data);
}


export function* watchLoginRequest() {
    yield takeEvery(LOGIN_REQUEST, loginRequest)
}

export function* rootSaga() {
    yield all([
        helloSaga(),
        watchLoginRequest()
    ])
}
