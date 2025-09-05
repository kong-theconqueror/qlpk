import { all, takeEvery, put, call } from 'redux-saga/effects';
import diseaseAction from '../actions/disease.action';
import notificationActions from '../actions/notification.action';

import diseaseApi from '../services/api/disease.api';

function* getDiseasesSaga({ value }) {
  try {
    const response = yield call(diseaseApi.getDiseases);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: diseaseAction.GET_DISEASES_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'disease.cant_get_diseases'
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
    takeEvery(diseaseAction.GET_DISEASES, getDiseasesSaga),
  ]);
}
