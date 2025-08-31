import { all, takeEvery, call } from 'redux-saga/effects';
import notificationAction from '../actions/notification.action';
import { 
    infoNotifiaction, 
    successNotification, 
    warningNotification, 
    errorNotification, 
    clearNotifications 
} from '../services/notification';

const infoSaga = function* (action){
    const message = action.value;
    try {
        yield call(infoNotifiaction, message);
    } catch (error) {
        console.log(error);
    }
}

const successSaga = function* (action) {
    const message = action.value;
    try {
        yield call(successNotification, message);
    } catch (error) {
        console.log(error);
    }
}

const warningSaga = function* (action) {
    const message = action.value;

    try {
        yield call(warningNotification, message);
    } catch (error) {
        console.log(error);
    }
}

const errorSaga = function* (action) {
    const message = action.value;
    try {
        yield call(errorNotification, message);
    } catch (error) {
        console.log(error);
    }
}

const clearSaga = function* (action) {
    try {
        yield call(clearNotifications);
    } catch (error) {
        console.log(error);
    }
}


export default function* rootSaga() {
    yield all([
        takeEvery(notificationAction.INFO, infoSaga),
        takeEvery(notificationAction.SUCCESS, successSaga),
        takeEvery(notificationAction.WARNING, warningSaga),
        takeEvery(notificationAction.ERROR, errorSaga),
        takeEvery(notificationAction.CLEAR, clearSaga),
    ]);
}