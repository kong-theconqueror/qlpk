import { treatmentAction } from '../actions';

const initState = {
    treatments: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
    isSearching: false,

    selectedTreatment: {
    },
    
    departments: [],

    isShowCreateTreatmentModal: false,
    isShowUpdateTreatmentModal: false,
    isShowDeteleTreatmentModal: false,
}

const treatmentReducer = (state = initState, action) => {
    switch (action.type) {
        case treatmentAction.GET_TREATMENTS_SUCCESS:
            return {
                ...state,
                treatments: action.value,
            }
        case treatmentAction.GET_TREATMENTS_FAIL:
            return {
                ...state,
                treatments: [],
            }
        case treatmentAction.GET_TREATMENTS_BY_PAGING_SUCCESS:
            return {
                ...state,
                treatments: action.value,
            }
        case treatmentAction.GET_TREATMENTS_BY_PAGING_FAIL:
            return {
                ...state,
                treatments: [],
            }
        case treatmentAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        
        case treatmentAction.SELECT_TREATMENT:
            return {
                ...state,
                selectedTreatment: action.value
            }

        case treatmentAction.SHOW_CREATE_TREATMENT_MODAL:
            return {
                ...state,
                isShowCreateTreatmentModal: true
            }

        case treatmentAction.HIDE_CREATE_TREATMENT_MODAL:
            return {
                ...state,
                isShowCreateTreatmentModal: false
            }

        case treatmentAction.GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.value,
            }
        case treatmentAction.GET_DEPARTMENTS_FAIL:
            return {
                ...state,
                departments: [],
            }

        case treatmentAction.SHOW_UPDATE_TREATMENT_MODAL:
            return {
                ...state,
                isShowUpdateTreatmentModal: true
            }

        case treatmentAction.HIDE_UPDATE_TREATMENT_MODAL:
            return {
                ...state,
                isShowUpdateTreatmentModal: false
            }

        case treatmentAction.SHOW_DELETE_TREATMENT_MODAL:
            return {
                ...state,
                isShowDeleteTreatmentModal: true
            }
        case treatmentAction.HIDE_DELETE_TREATMENT_MODAL:
            return {
                ...state,
                isShowDeleteTreatmentModal: false
            }

        default:
            return state;
    }
}

export default treatmentReducer;