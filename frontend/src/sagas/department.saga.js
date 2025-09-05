import { all, takeEvery, put, call } from 'redux-saga/effects';
import departmentAction from '../actions/department.action';
import notificationActions from '../actions/notification.action';

import departmentApi from '../services/api/department.api';

function* getDepartmentsSaga({ value }) {
  try {
    const response = yield call(departmentApi.getDepartments);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: departmentAction.GET_DEPARTMENTS_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'department.cant_get_departments'
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
    takeEvery(departmentAction.GET_DEPARTMENTS, getDepartmentsSaga),
  ]);
}
