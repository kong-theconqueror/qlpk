import { all, takeEvery, put, call } from 'redux-saga/effects';
import doctorAction from '../actions/doctor.action';
import notificationActions from '../actions/notification.action';

import doctorApi from '../services/api/doctor.api';
import departmentApi from '../services/api/department.api';

function* getDoctorsSaga({ value }) {
  try {
    const response = yield call(doctorApi.getDoctors);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: doctorAction.GET_DOCTORS_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'doctor.cant_get_doctors'
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
          type: doctorAction.GET_DEPARTMENTS_SUCCESS,
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

function* createDoctorSaga({ value }) {
    try {
      console.log(value)
        const response = yield call(doctorApi.createDoctor, value);
        if (response.status === 200 || response.status === 201) {
            let _data = response.data;
            // console.log(data)
            const { data } = _data;
            yield put({
                    type: doctorAction.CREATE_DOCTOR_SUCCESS,
                    value: data
                });
            yield put({
                type: notificationActions.SUCCESS,
                value: 'doctor.create_doctor_success',
            });
            // yield put({
            //     type: doctorAction.PAGE_CHANGE,
            //     value: 1,
            // });
            yield put({
                type: doctorAction.GET_DOCTORS,
                // value: {
                //     page: 1,
                //     size: 20,
                // }
            });

        } else {
            console.log('API error');
            yield put({
                type: doctorAction.CREATE_DOCTOR_FAIL,
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
            type: doctorAction.CREATE_DOCTOR_FAIL,
            value: ''
        });
    }
}

function* updateDoctorSaga({ value }) {
    try {
        const response = yield call(doctorApi.updateDoctor, value);
        if (response.status === 200 || response.status === 201) {
            let _data = response.data;
            // console.log(data)
            const { data } = _data;
            yield put({
                type: doctorAction.UPDATE_DOCTOR_SUCCESS,
                value: data
            });
            yield put({
                type: notificationActions.SUCCESS,
                value: 'doctor.update_doctor_success',
            });
            yield put({
                type: doctorAction.GET_DOCTORS,
            });

        } else {
            console.log('API error');
            yield put({
                type: doctorAction.UPDATE_DOCTOR_FAIL,
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
            type: doctorAction.UPDATE_DOCTOR_FAIL,
            value: ''
        });
    }
}

function* deleteDoctorSaga({ value }) {
    try {
        const response = yield call(doctorApi.deleteDoctor, value);
        if (response.status === 200 || response.status === 201 ) {
            let _data = response.data;
            const { message } = _data;
            yield put({
                    type: doctorAction.DELETE_DOCTOR_SUCCESS,
                    value: message
                });
            yield put({
                type: notificationActions.SUCCESS,
                value: message,
            });
            yield put({
                type: doctorAction.GET_DOCTORS,
            });

        } else {
            console.log('API error');
            yield put({
                type: doctorAction.DELETE_DOCTOR_FAIL,
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
            type: doctorAction.DELETE_DOCTOR_FAIL,
            value: ''
        });
    }
}

export default function* rootSaga() {
  yield all([
    takeEvery(doctorAction.GET_DOCTORS, getDoctorsSaga),
    takeEvery(doctorAction.GET_DEPARTMENTS, getDepartmentsSaga),
    takeEvery(doctorAction.CREATE_DOCTOR, createDoctorSaga),
    takeEvery(doctorAction.UPDATE_DOCTOR, updateDoctorSaga),
    takeEvery(doctorAction.DELETE_DOCTOR, deleteDoctorSaga),
  ]);
}
