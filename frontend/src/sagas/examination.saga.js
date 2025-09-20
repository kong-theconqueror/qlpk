import { all, takeEvery, put, call } from 'redux-saga/effects';
import examinationAction from '../actions/examination.action';
import notificationActions from '../actions/notification.action';

import examinationApi from '../services/api/examination.api';
import departmentApi from '../services/api/department.api';

function* getExaminationsSaga({ value }) {
  try {
    const response = yield call(examinationApi.getExaminations, value);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: examinationAction.GET_EXAMINATIONS_SUCCESS,
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

function* getDepartmentsSaga({ value }) {
  try {
    const response = yield call(departmentApi.getDepartments);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      yield put({
          type: examinationAction.GET_DEPARTMENTS_SUCCESS,
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

function* createExaminationSaga({ value }) {
    try {
      console.log(value)
        const response = yield call(examinationApi.createExamination, value);
        if (response.status === 200 || response.status === 201) {
            let _data = response.data;
            // console.log(data)
            const { data } = _data;
            yield put({
                    type: examinationAction.CREATE_EXAMINATION_SUCCESS,
                    value: data
                });
            yield put({
                type: notificationActions.SUCCESS,
                value: 'examination.create_examination_success',
            });
            // yield put({
            //     type: examinationAction.PAGE_CHANGE,
            //     value: 1,
            // });
            yield put({
                type: examinationAction.GET_EXAMINATIONS,
                // value: {
                //     page: 1,
                //     size: 20,
                // }
            });

        } else {
            console.log('API error');
            yield put({
                type: examinationAction.CREATE_EXAMINATION_FAIL,
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
            type: examinationAction.CREATE_EXAMINATION_FAIL,
            value: ''
        });
    }
}

function* updateExaminationSaga({ value }) {
    try {
        const response = yield call(examinationApi.updateExamination, value);
        if (response.status === 200 || response.status === 201) {
            let _data = response.data;
            // console.log(data)
            const { data } = _data;
            yield put({
                type: examinationAction.UPDATE_EXAMINATION_SUCCESS,
                value: data
            });
            yield put({
                type: notificationActions.SUCCESS,
                value: 'examination.update_examination_success',
            });
            yield put({
                type: examinationAction.GET_EXAMINATIONS,
            });

        } else {
            console.log('API error');
            yield put({
                type: examinationAction.UPDATE_EXAMINATION_FAIL,
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
            type: examinationAction.UPDATE_EXAMINATION_FAIL,
            value: ''
        });
    }
}

function* deleteExaminationSaga({ value }) {
    try {
        const response = yield call(examinationApi.deleteExamination, value);
        if (response.status === 200 || response.status === 201 ) {
            let _data = response.data;
            const { message } = _data;
            yield put({
                    type: examinationAction.DELETE_EXAMINATION_SUCCESS,
                    value: message
                });
            yield put({
                type: notificationActions.SUCCESS,
                value: message,
            });
            yield put({
                type: examinationAction.GET_EXAMINATIONS,
            });

        } else {
            console.log('API error');
            yield put({
                type: examinationAction.DELETE_EXAMINATION_FAIL,
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
            type: examinationAction.DELETE_EXAMINATION_FAIL,
            value: ''
        });
    }
}

export default function* rootSaga() {
  yield all([
    takeEvery(examinationAction.GET_EXAMINATIONS, getExaminationsSaga),
    takeEvery(examinationAction.GET_DEPARTMENTS, getDepartmentsSaga),
    takeEvery(examinationAction.CREATE_EXAMINATION, createExaminationSaga),
    takeEvery(examinationAction.UPDATE_EXAMINATION, updateExaminationSaga),
    takeEvery(examinationAction.DELETE_EXAMINATION, deleteExaminationSaga),
  ]);
}
