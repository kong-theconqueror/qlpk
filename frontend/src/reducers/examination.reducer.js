import { examinationAction } from '../actions';

const initState = {
    examinations: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
    isSearching: false,

    selectedExamination: {
    },
    
    departments: [],

    isShowCreateExaminationModal: false,
    isShowUpdateExaminationModal: false,
    isShowDeteleExaminationModal: false,
}

const examinationReducer = (state = initState, action) => {
    switch (action.type) {
        case examinationAction.GET_EXAMINATIONS_SUCCESS:
            return {
                ...state,
                examinations: action.value,
            }
        case examinationAction.GET_EXAMINATIONS_FAIL:
            return {
                ...state,
                examinations: [],
            }
        case examinationAction.GET_EXAMINATIONS_BY_PAGING_SUCCESS:
            return {
                ...state,
                examinations: action.value,
            }
        case examinationAction.GET_EXAMINATIONS_BY_PAGING_FAIL:
            return {
                ...state,
                examinations: [],
            }
        case examinationAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        
        case examinationAction.SELECT_EXAMINATION:
            return {
                ...state,
                selectedExamination: action.value
            }

        case examinationAction.SHOW_CREATE_EXAMINATION_MODAL:
            return {
                ...state,
                isShowCreateExaminationModal: true
            }

        case examinationAction.HIDE_CREATE_EXAMINATION_MODAL:
            return {
                ...state,
                isShowCreateExaminationModal: false
            }

        case examinationAction.GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.value,
            }
        case examinationAction.GET_DEPARTMENTS_FAIL:
            return {
                ...state,
                departments: [],
            }

        case examinationAction.SHOW_UPDATE_EXAMINATION_MODAL:
            return {
                ...state,
                isShowUpdateExaminationModal: true
            }

        case examinationAction.HIDE_UPDATE_EXAMINATION_MODAL:
            return {
                ...state,
                isShowUpdateExaminationModal: false
            }

        case examinationAction.SHOW_DELETE_EXAMINATION_MODAL:
            return {
                ...state,
                isShowDeleteExaminationModal: true
            }
        case examinationAction.HIDE_DELETE_EXAMINATION_MODAL:
            return {
                ...state,
                isShowDeleteExaminationModal: false
            }

        default:
            return state;
    }
}

export default examinationReducer;