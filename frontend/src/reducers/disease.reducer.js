import { diseaseAction } from '../actions';

const initState = {
    diseases: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const diseaseReducer = (state = initState, action) => {
    switch (action.type) {
        case diseaseAction.GET_DISEASES_SUCCESS:
            return {
                ...state,
                diseases: action.value,
            }
        case diseaseAction.GET_DISEASES_FAIL:
            return {
                ...state,
                diseases: [],
            }
        case diseaseAction.GET_DISEASES_BY_PAGING_SUCCESS:
            return {
                ...state,
                diseases: action.value,
            }
        case diseaseAction.GET_DISEASES_BY_PAGING_FAIL:
            return {
                ...state,
                diseases: [],
            }
        case diseaseAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default diseaseReducer;