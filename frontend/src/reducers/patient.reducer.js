import { patientAction } from '../actions';

const initState = {
    patients: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const patientReducer = (state = initState, action) => {
    switch (action.type) {
        case patientAction.GET_PATIENTS_SUCCESS:
            return {
                ...state,
                patients: action.value,
            }
        case patientAction.GET_PATIENTS_FAIL:
            return {
                ...state,
                patients: [],
            }
        case patientAction.GET_PATIENTS_BY_PAGING_SUCCESS:
            return {
                ...state,
                patients: action.value,
            }
        case patientAction.GET_PATIENTS_BY_PAGING_FAIL:
            return {
                ...state,
                patients: [],
            }
        case patientAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default patientReducer;