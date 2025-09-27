import { all, takeEvery, put, call } from 'redux-saga/effects';
import medicalRecordAction from '../actions/medicalRecord.action';
import notificationActions from '../actions/notification.action';

import medicalRecordApi from '../services/api/medicalRecord.api';
import departmentApi from '../services/api/department.api';
import examinationApi from '../services/api/examination.api';

function* getMedicalRecordsSaga({ value }) {
  try {
    const response = yield call(medicalRecordApi.getMedicalRecords, value);
    if (response.status === 200 || response.status === 201) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: medicalRecordAction.GET_MEDICAL_RECORDS_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'medicalRecord.cant_get_medicalRecords'
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
    if (response.status === 200 || response.status === 201) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: medicalRecordAction.GET_DEPARTMENTS_SUCCESS,
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

function* createMedicalRecordSaga({ value }) {
    try {
      console.log(value)
        const response = yield call(medicalRecordApi.createMedicalRecord, value);
        if (response.status === 200 || response.status === 201) {
            let _data = response.data;
            // console.log(data)
            const { data } = _data;
            yield put({
                    type: medicalRecordAction.CREATE_MEDICAL_RECORD_SUCCESS,
                    value: data
                });
            yield put({
                type: notificationActions.SUCCESS,
                value: 'medicalRecord.create_medicalRecord_success',
            });
            // yield put({
            //     type: medicalRecordAction.PAGE_CHANGE,
            //     value: 1,
            // });
            yield put({
                type: medicalRecordAction.GET_MEDICAL_RECORDS,
                // value: {
                //     page: 1,
                //     size: 20,
                // }
            });

        } else {
            console.log('API error');
            yield put({
                type: medicalRecordAction.CREATE_MEDICAL_RECORD_FAIL,
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
            type: medicalRecordAction.CREATE_MEDICAL_RECORD_FAIL,
            value: ''
        });
    }
}

function* updateMedicalRecordSaga({ value }) {
    try {
        const response = yield call(medicalRecordApi.updateMedicalRecord, value);
        if (response.status === 200 || response.status === 201) {
            let _data = response.data;
            // console.log(data)
            const { data } = _data;
            yield put({
                type: medicalRecordAction.UPDATE_MEDICAL_RECORD_SUCCESS,
                value: data
            });
            yield put({
                type: notificationActions.SUCCESS,
                value: 'medicalRecord.update_medicalRecord_success',
            });
            yield put({
                type: medicalRecordAction.GET_MEDICAL_RECORDS,
            });

        } else {
            console.log('API error');
            yield put({
                type: medicalRecordAction.UPDATE_MEDICAL_RECORD_FAIL,
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
            type: medicalRecordAction.UPDATE_MEDICAL_RECORD_FAIL,
            value: ''
        });
    }
}

function* deleteMedicalRecordSaga({ value }) {
    try {
        const response = yield call(medicalRecordApi.deleteMedicalRecord, value);
        if (response.status === 200 || response.status === 201 ) {
            let _data = response.data;
            const { message } = _data;
            yield put({
                    type: medicalRecordAction.DELETE_MEDICAL_RECORD_SUCCESS,
                    value: message
                });
            yield put({
                type: notificationActions.SUCCESS,
                value: message,
            });
            yield put({
                type: medicalRecordAction.GET_MEDICAL_RECORDS,
            });

        } else {
            console.log('API error');
            yield put({
                type: medicalRecordAction.DELETE_MEDICAL_RECORD_FAIL,
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
            type: medicalRecordAction.DELETE_MEDICAL_RECORD_FAIL,
            value: ''
        });
    }
}

function* getExamDetailSaga({ value }) {
  try {
    const response = yield call(examinationApi.getRecordExam, value);
    if (response.status === 200 || response.status === 201) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: medicalRecordAction.GET_EXAM_DETAIL_SUCCESS,
          value: _data
        });
     
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'examination.cant_get_examinations'
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
    takeEvery(medicalRecordAction.GET_MEDICAL_RECORDS, getMedicalRecordsSaga),
    takeEvery(medicalRecordAction.GET_DEPARTMENTS, getDepartmentsSaga),
    takeEvery(medicalRecordAction.CREATE_MEDICAL_RECORD, createMedicalRecordSaga),
    takeEvery(medicalRecordAction.UPDATE_MEDICAL_RECORD, updateMedicalRecordSaga),
    takeEvery(medicalRecordAction.DELETE_MEDICAL_RECORD, deleteMedicalRecordSaga),
    takeEvery(medicalRecordAction.GET_EXAM_DETAIL, getExamDetailSaga),
  ]);
}
