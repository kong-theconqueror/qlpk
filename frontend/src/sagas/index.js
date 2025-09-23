import { all } from 'redux-saga/effects';

import userSaga from './user.saga';
// import sidebarSaga from './sidebar.saga';
import notificationSaga from './notification.saga';

import examinationSaga from './examination.saga';
import treatmentSaga from './treatment.saga';
import medicalRecordSaga from './medicalRecord.saga';
import patientSaga from './patient.saga';

import doctorSaga from './doctor.saga';
import nurseSaga from './nurse.saga';
import diseaseSaga from './disease.saga';
import departmentSaga from './department.saga';
import medicineSaga from './medicine.saga';
import equipmentSaga from './equipment.saga';
import serviceSaga from './service.saga';

import doctorSalarySaga from './doctorSalary.saga';
import nurseSalarySaga from './nurseSalary.saga';
import revenueSaga from './revenue.saga';
import diseaseStatisticSaga from './diseaseStatistic.saga';

export default function* rootSaga(getState) {
  yield all([
    userSaga(),
    // sidebarSaga(),
    notificationSaga(),

    examinationSaga(),
    treatmentSaga(),
    medicalRecordSaga(),
    patientSaga(),
    
    doctorSaga(),
    nurseSaga(),
    diseaseSaga(),
    departmentSaga(),
    medicineSaga(),
    equipmentSaga(),
    serviceSaga(),

    doctorSalarySaga(),
    nurseSalarySaga(),
    revenueSaga(),
    diseaseStatisticSaga(),
  ]);
}