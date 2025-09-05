import { all, takeEvery, put, call } from 'redux-saga/effects';
import equiqmentAction from '../actions/equiqment.action';
import notificationActions from '../actions/notification.action';

import equiqmentApi from '../services/api/equiqment.api';

function* getEquiqmentsSaga({ value }) {
  try {
    const response = yield call(equiqmentApi.getEquiqments);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: equiqmentAction.GET_EQUIQMENTS_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'equiqment.cant_get_equiqments'
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
    takeEvery(equiqmentAction.GET_EQUIQMENTS, getEquiqmentsSaga),
  ]);
}
