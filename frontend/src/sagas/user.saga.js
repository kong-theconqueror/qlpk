import { all, takeEvery, put, call } from 'redux-saga/effects';
import userActions from '../actions/user.action';
import notificationActions from '../actions/notification.action';

import { history } from '../helpers/history';
import Urls from '../constants/urls.constant';
import userApi from '../services/api/user.api';

function* loginSaga({ value }) {
  const { username, password } = value;
  try {
    const response = yield call(userApi.login, username, password);
    if (response.status === 200) {
      let _data = response.data;
      console.log(_data)
      const { access_token, message } = _data;

      if(access_token){
        yield put({
          type: userActions.LOG_IN_SUCCESS,
          value: {
            // userID: id,
            // email: email,
            // username: username,
            token: access_token,
            // roles: roles,
            // idRole: idRole,
          }
        });
        
        yield put({
          type: notificationActions.SUCCESS,
          // value: "Đăng nhập thành công!"
          value: 'login.login_success',
        });

        history.push(Urls.HOME);
      }else{
        yield put({
          type: notificationActions.ERROR,
          value: message
        });
      }
    } else {
      yield put({
        type: notificationActions.ERROR,
        value: 'login.user_password_incorrect'
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: notificationActions.ERROR,
      value: 'login.api_error'
    });
    yield put(
      {
        type: userActions.LOG_IN_FAIL,
        value: error
      }
    );
  }
}
/* 
function* registerSaga({ payload }) {
  const { display_name, email, phone, password } = payload.data;
  try {
    const response = yield call(userApi.register, display_name, email, phone, password);
    if (response.status === 200) {
      let data = response.data;
      const { success, message } = data;
      if (success) {
        yield put(userActions.registerSuccess());
        yield put(notificationActions.success(message));
        history.push(Urls.LOGIN);
      } else {
        yield put(notificationActions.error(message));
      }
    } else {
      console.log('API error');
      yield put(userActions.registerError());
    }
  } catch (error) {
    console.log(error);
    yield put(userActions.registerError(error));
  }
} */

export default function* rootSaga() {
  yield all([
    takeEvery(userActions.LOG_IN, loginSaga),
    //takeEvery(userActions.REGISTER, registerSaga),
  ]);
}
