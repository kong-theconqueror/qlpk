import { all, takeEvery, put, call } from 'redux-saga/effects';
import { searchAction, notificationAction } from '../actions';
import searchApi from '../services/api/search.api';

function* getItemsByPaging({ payload }) {
    try {
        const response = yield call(searchApi.searchAccounts);
        if (response.status === 200) {
            let data = response.data;
            // console.log(data)
            yield put({
                type: itemsAction.GET_ITEMS_BY_PAGING_SUCCESS,
                value: data
            });
        } else {
            console.log('API error');
            yield put({
                type: itemsAction.GET_ITEMS_BY_PAGING_FAIL,
                value: ''
            });
            yield put({
                type: notificationAction.ERROR,
                value: "notification.api_error",
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: itemsAction.GET_ITEMS_BY_PAGING_FAIL,
            value: ''
        });
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(itemsAction.GET_ITEMS_BY_PAGING, getItemsByPaging),
    ]);
}
