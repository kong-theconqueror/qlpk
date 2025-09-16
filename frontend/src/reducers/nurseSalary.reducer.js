import { nurseSalaryAction } from '../actions';

const initState = {
    salaries: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const salaryReducer = (state = initState, action) => {
    switch (action.type) {
        case nurseSalaryAction.GET_SALARIES_SUCCESS:
            return {
                ...state,
                salaries: action.value,
            }
        case nurseSalaryAction.GET_SALARIES_FAIL:
            return {
                ...state,
                salaries: [],
            }
        case nurseSalaryAction.GET_SALARIES_BY_PAGING_SUCCESS:
            return {
                ...state,
                salaries: action.value,
            }
        case nurseSalaryAction.GET_SALARIES_BY_PAGING_FAIL:
            return {
                ...state,
                salaries: [],
            }
        case nurseSalaryAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default salaryReducer;