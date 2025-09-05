import { medicineAction } from '../actions';

const initState = {
    medicines: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const medicineReducer = (state = initState, action) => {
    switch (action.type) {
        case medicineAction.GET_MEDICINES_SUCCESS:
            return {
                ...state,
                medicines: action.value,
            }
        case medicineAction.GET_MEDICINES_FAIL:
            return {
                ...state,
                medicines: [],
            }
        case medicineAction.GET_MEDICINES_BY_PAGING_SUCCESS:
            return {
                ...state,
                medicines: action.value,
            }
        case medicineAction.GET_MEDICINES_BY_PAGING_FAIL:
            return {
                ...state,
                medicines: [],
            }
        case medicineAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default medicineReducer;