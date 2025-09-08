import { salaryAction } from '../actions';

const initState = {
    salaries: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const salaryReducer = (state = initState, action) => {
    switch (action.type) {
        case salaryAction.GET_SALARIES_SUCCESS:
            return {
                ...state,
                salaries: action.value,
            }
        case salaryAction.GET_SALARIES_FAIL:
            return {
                ...state,
                salaries: [],
            }
        case salaryAction.GET_SALARIES_BY_PAGING_SUCCESS:
            return {
                ...state,
                salaries: action.value,
            }
        case salaryAction.GET_SALARIES_BY_PAGING_FAIL:
            return {
                ...state,
                salaries: [],
            }
        case salaryAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default salaryReducer;