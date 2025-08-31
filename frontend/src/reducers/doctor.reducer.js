import { doctorAction } from '../actions';

const initState = {
    doctors: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const doctorReducer = (state = initState, action) => {
    switch (action.type) {
        case doctorAction.GET_DOCTORS_BY_PAGING_SUCCESS:
            return {
                ...state,
                doctors: action.value,
            }
        case doctorAction.GET_DOCTORS_BY_PAGING_FAIL:
            return {
                ...state,
                doctors: [],
            }
        case doctorAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default doctorReducer;