import { departmentAction } from '../actions';

const initState = {
    departments: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const departmentReducer = (state = initState, action) => {
    switch (action.type) {
        case departmentAction.GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.value,
            }
        case departmentAction.GET_DEPARTMENTS_FAIL:
            return {
                ...state,
                departments: [],
            }
        case departmentAction.GET_DEPARTMENTS_BY_PAGING_SUCCESS:
            return {
                ...state,
                departments: action.value,
            }
        case departmentAction.GET_DEPARTMENTS_BY_PAGING_FAIL:
            return {
                ...state,
                departments: [],
            }
        case departmentAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default departmentReducer;