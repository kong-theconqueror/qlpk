import { all, takeEvery, put, call } from 'redux-saga/effects';
import equipmentAction from '../actions/equipment.action';
import notificationActions from '../actions/notification.action';

import equipmentApi from '../services/api/equipment.api';

function* getEquipmentsSaga({ value }) {
  try {
    const response = yield call(equipmentApi.getEquipments);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: equipmentAction.GET_EQUIPMENTS_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'equipment.cant_get_equipments'
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
    takeEvery(equipmentAction.GET_EQUIPMENTS, getEquipmentsSaga),
  ]);
}
