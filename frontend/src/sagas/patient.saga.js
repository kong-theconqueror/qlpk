import { all, takeEvery, put, call } from 'redux-saga/effects';
import patientAction from '../actions/patient.action';
import notificationActions from '../actions/notification.action';

import patientApi from '../services/api/patient.api';

function* getPatientsSaga({ value }) {
  try {
    const response = yield call(patientApi.getPatients);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: patientAction.GET_PATIENTS_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'patient.cant_get_patients'
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
    takeEvery(patientAction.GET_PATIENTS, getPatientsSaga),
  ]);
}
