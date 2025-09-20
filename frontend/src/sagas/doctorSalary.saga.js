import { all, takeEvery, put, call } from 'redux-saga/effects';
import doctorSalaryAction from '../actions/doctorSalary.action';
import notificationActions from '../actions/notification.action';

import salaryApi from '../services/api/salary.api';

function* getDoctorSalariesSaga({ value }) {
  try {
    const response = yield call(salaryApi.getDoctorSalaries, value);
    if (response.status === 200 || response.status === 201) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: doctorSalaryAction.GET_SALARIES_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'salary.cant_get_salarys'
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
    takeEvery(doctorSalaryAction.GET_SALARIES, getDoctorSalariesSaga),
  ]);
}
