import { all, takeEvery, put, call } from 'redux-saga/effects';
import diseaseStatisticAction from '../actions/diseaseStatistic.action';
import notificationActions from '../actions/notification.action';

import diseaseApi from '../services/api/disease.api';

function* getDiseaseStatisticSaga({ value }) {
  try {
    const response = yield call(diseaseApi.getDiseaseStatistic, value);
    if (response.status === 200 || response.status === 201) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: diseaseStatisticAction.GET_DISEASES_SUCCESS,
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
    takeEvery(diseaseStatisticAction.GET_DISEASES, getDiseaseStatisticSaga),
  ]);
}
