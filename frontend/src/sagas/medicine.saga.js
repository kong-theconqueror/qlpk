import { all, takeEvery, put, call } from 'redux-saga/effects';
import medicineAction from '../actions/medicine.action';
import notificationActions from '../actions/notification.action';

import medicineApi from '../services/api/medicine.api';

function* getMedicinesSaga({ value }) {
  try {
    const response = yield call(medicineApi.getMedicines);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: medicineAction.GET_MEDICINES_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'medicine.cant_get_medicines'
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
    takeEvery(medicineAction.GET_MEDICINES, getMedicinesSaga),
  ]);
}
