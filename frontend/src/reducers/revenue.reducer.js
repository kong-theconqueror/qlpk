import { revenueAction } from '../actions';

const initState = {
    revenues: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const revenueReducer = (state = initState, action) => {
    switch (action.type) {
        case revenueAction.GET_REVENUES_SUCCESS:
            return {
                ...state,
                revenues: action.value,
            }
        case revenueAction.GET_REVENUES_FAIL:
            return {
                ...state,
                revenues: [],
            }
        case revenueAction.GET_REVENUES_BY_PAGING_SUCCESS:
            return {
                ...state,
                revenues: action.value,
            }
        case revenueAction.GET_REVENUES_BY_PAGING_FAIL:
            return {
                ...state,
                revenues: [],
            }
        case revenueAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default revenueReducer;