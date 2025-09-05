import { all, takeEvery, put, call } from 'redux-saga/effects';
import serviceAction from '../actions/service.action';
import notificationActions from '../actions/notification.action';

import serviceApi from '../services/api/service.api';

function* getServicesSaga({ value }) {
  try {
    const response = yield call(serviceApi.getServices);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: serviceAction.GET_SERVICES_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'service.cant_get_services'
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
    takeEvery(serviceAction.GET_SERVICES, getServicesSaga),
  ]);
}
