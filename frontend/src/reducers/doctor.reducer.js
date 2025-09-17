import { doctorAction } from '../actions';

const initState = {
    doctors: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
    isSearching: false,

    selectedDoctor: {
    },

    genders: [
        {id:"Nam", name:"Nam"},
        {id:"Nữ", name:"Nữ"}
    ],
    departments: [],

    isShowCreateDoctorModal: false,
    isShowUpdateDoctorModal: false,
    isShowDeteleDoctorModal: false,
}

const doctorReducer = (state = initState, action) => {
    switch (action.type) {
        case doctorAction.GET_DOCTORS_SUCCESS:
            return {
                ...state,
                doctors: action.value,
            }
        case doctorAction.GET_DOCTORS_FAIL:
            return {
                ...state,
                doctors: [],
            }
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
        
        case doctorAction.SELECT_DOCTOR:
            return {
                ...state,
                selectedDoctor: action.value
            }

        case doctorAction.SHOW_CREATE_DOCTOR_MODAL:
            return {
                ...state,
                isShowCreateDoctorModal: true
            }

        case doctorAction.HIDE_CREATE_DOCTOR_MODAL:
            return {
                ...state,
                isShowCreateDoctorModal: false
            }

        case doctorAction.GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.value,
            }
        case doctorAction.GET_DEPARTMENTS_FAIL:
            return {
                ...state,
                departments: [],
            }

        case doctorAction.SHOW_UPDATE_DOCTOR_MODAL:
            return {
                ...state,
                isShowUpdateDoctorModal: true
            }

        case doctorAction.HIDE_UPDATE_DOCTOR_MODAL:
            return {
                ...state,
                isShowUpdateDoctorModal: false
            }

        case doctorAction.SHOW_DELETE_DOCTOR_MODAL:
            return {
                ...state,
                isShowDeleteDoctorModal: true
            }
        case doctorAction.HIDE_DELETE_DOCTOR_MODAL:
            return {
                ...state,
                isShowDeleteDoctorModal: false
            }

        default:
            return state;
    }
}

export default doctorReducer;