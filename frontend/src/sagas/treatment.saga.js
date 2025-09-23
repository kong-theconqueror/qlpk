import { all, takeEvery, put, call } from 'redux-saga/effects';
import treatmentAction from '../actions/treatment.action';
import notificationActions from '../actions/notification.action';

import treatmentApi from '../services/api/treatment.api';
import departmentApi from '../services/api/department.api';

function* getTreatmentsSaga({ value }) {
  try {
    const response = yield call(treatmentApi.getTreatments, value);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: treatmentAction.GET_TREATMENTS_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'treatment.cant_get_treatments'
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

function* getDepartmentsSaga({ value }) {
  try {
    const response = yield call(departmentApi.getDepartments);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: treatmentAction.GET_DEPARTMENTS_SUCCESS,
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

function* createTreatmentSaga({ value }) {
    try {
      console.log(value)
        const response = yield call(treatmentApi.createTreatment, value);
        if (response.status === 200 || response.status === 201) {
            let _data = response.data;
            // console.log(data)
            const { data } = _data;
            yield put({
                    type: treatmentAction.CREATE_TREATMENT_SUCCESS,
                    value: data
                });
            yield put({
                type: notificationActions.SUCCESS,
                value: 'treatment.create_treatment_success',
            });
            // yield put({
            //     type: treatmentAction.PAGE_CHANGE,
            //     value: 1,
            // });
            yield put({
                type: treatmentAction.GET_TREATMENTS,
                // value: {
                //     page: 1,
                //     size: 20,
                // }
            });

        } else {
            console.log('API error');
            yield put({
                type: treatmentAction.CREATE_TREATMENT_FAIL,
                value: ''
            });
            yield put({
                type: notificationActions.ERROR,
                value: "notification.api_error",
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: treatmentAction.CREATE_TREATMENT_FAIL,
            value: ''
        });
    }
}

function* updateTreatmentSaga({ value }) {
    try {
        const response = yield call(treatmentApi.updateTreatment, value);
        if (response.status === 200 || response.status === 201) {
            let _data = response.data;
            // console.log(data)
            const { data } = _data;
            yield put({
                type: treatmentAction.UPDATE_TREATMENT_SUCCESS,
                value: data
            });
            yield put({
                type: notificationActions.SUCCESS,
                value: 'treatment.update_treatment_success',
            });
            yield put({
                type: treatmentAction.GET_TREATMENTS,
            });

        } else {
            console.log('API error');
            yield put({
                type: treatmentAction.UPDATE_TREATMENT_FAIL,
                value: ''
            });
            yield put({
                type: notificationActions.ERROR,
                value: "notification.api_error",
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: treatmentAction.UPDATE_TREATMENT_FAIL,
            value: ''
        });
    }
}

function* deleteTreatmentSaga({ value }) {
    try {
        const response = yield call(treatmentApi.deleteTreatment, value);
        if (response.status === 200 || response.status === 201 ) {
            let _data = response.data;
            const { message } = _data;
            yield put({
                    type: treatmentAction.DELETE_TREATMENT_SUCCESS,
                    value: message
                });
            yield put({
                type: notificationActions.SUCCESS,
                value: message,
            });
            yield put({
                type: treatmentAction.GET_TREATMENTS,
            });

        } else {
            console.log('API error');
            yield put({
                type: treatmentAction.DELETE_TREATMENT_FAIL,
                value: ''
            });
            yield put({
                type: notificationActions.ERROR,
                value: "notification.api_error",
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: treatmentAction.DELETE_TREATMENT_FAIL,
            value: ''
        });
    }
}

export default function* rootSaga() {
  yield all([
    takeEvery(treatmentAction.GET_TREATMENTS, getTreatmentsSaga),
    takeEvery(treatmentAction.GET_DEPARTMENTS, getDepartmentsSaga),
    takeEvery(treatmentAction.CREATE_TREATMENT, createTreatmentSaga),
    takeEvery(treatmentAction.UPDATE_TREATMENT, updateTreatmentSaga),
    takeEvery(treatmentAction.DELETE_TREATMENT, deleteTreatmentSaga),
  ]);
}
