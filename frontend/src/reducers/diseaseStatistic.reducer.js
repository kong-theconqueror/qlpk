import { diseaseStatisticAction } from '../actions';

const initState = {
    diseases: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const diseaseStatisticReducer = (state = initState, action) => {
    switch (action.type) {
        case diseaseStatisticAction.GET_DISEASES_SUCCESS:
            return {
                ...state,
                diseases: action.value,
            }
        case diseaseStatisticAction.GET_DISEASES_FAIL:
            return {
                ...state,
                diseases: [],
            }
        case diseaseStatisticAction.GET_DISEASES_BY_PAGING_SUCCESS:
            return {
                ...state,
                diseases: action.value,
            }
        case diseaseStatisticAction.GET_DISEASES_BY_PAGING_FAIL:
            return {
                ...state,
                diseases: [],
            }
        case diseaseStatisticAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default diseaseStatisticReducer;