import { all, takeEvery, put, call } from 'redux-saga/effects';
import revenueAction from '../actions/revenue.action';
import notificationActions from '../actions/notification.action';

import revenueApi from '../services/api/revenue.api';

function* getRevenuesSaga({ value }) {
  try {
    const response = yield call(revenueApi.getRevenues, value);
    if (response.status === 200 || response.status === 201) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: revenueAction.GET_REVENUES_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'revenue.cant_get_revenues'
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
    takeEvery(revenueAction.GET_REVENUES, getRevenuesSaga),
  ]);
}
