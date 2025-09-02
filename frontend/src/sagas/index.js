import { all } from 'redux-saga/effects';

import userSaga from './user.saga';
// import sidebarSaga from './sidebar.saga';
import notificationSaga from './notification.saga';

import doctorSaga from './doctor.saga';

export default function* rootSaga(getState) {
  yield all([
    userSaga(),
    // sidebarSaga(),
    notificationSaga(),

    doctorSaga(),
  ]);
}