import { all, takeEvery, put, call } from 'redux-saga/effects';
import nurseAction from '../actions/nurse.action';
import notificationActions from '../actions/notification.action';

import nurseApi from '../services/api/nurse.api';

function* getNursesSaga({ value }) {
  try {
    const response = yield call(nurseApi.getNurses);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: nurseAction.GET_NURSES_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'nurse.cant_get_nurses'
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: notificationActions.ERROR,
      value: 'login.api_error'
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(nurseAction.GET_NURSES, getNursesSaga),
  ]);
}
