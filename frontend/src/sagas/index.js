import { all } from 'redux-saga/effects';

import userSaga from './user.saga';
// import sidebarSaga from './sidebar.saga';
import notificationSaga from './notification.saga';

import doctorSaga from './doctor.saga';
import nurseSaga from './nurse.saga';
import patientSaga from './patient.saga';
import diseaseSaga from './disease.saga';
import departmentSaga from './department.saga';
import medicineSaga from './medicine.saga';
import equiqmentSaga from './equiqment.saga';
import serviceSaga from './service.saga';

export default function* rootSaga(getState) {
  yield all([
    userSaga(),
    // sidebarSaga(),
    notificationSaga(),

    doctorSaga(),
    nurseSaga(),
    patientSaga(),
    diseaseSaga(),
    departmentSaga(),
    medicineSaga(),
    equiqmentSaga(),
    serviceSaga(),
  ]);
}