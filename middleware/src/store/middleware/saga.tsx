import { takeEvery } from 'redux-saga/effects'
import { INCREMENT } from '../constants/ActionTypes'


function* incremetSaga() {
    yield console.log("saga increment action")
 }

export function* exampleSaga() {
    yield takeEvery(INCREMENT, incremetSaga);
}