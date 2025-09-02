import { all, takeEvery, put, call } from 'redux-saga/effects';
import doctorAction from '../actions/doctor.action';
import notificationActions from '../actions/notification.action';

import doctorApi from '../services/api/doctor.api';

function* getDoctorsSaga({ value }) {
  try {
    const response = yield call(doctorApi.getDoctors);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: doctorAction.GET_DOCTORS_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'doctor.cant_get_doctors'
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
    takeEvery(doctorAction.GET_DOCTORS, getDoctorsSaga),
  ]);
}
