import { medicalRecordAction } from '../actions';

const initState = {
    medicalRecords: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
    isSearching: false,

    selectedMedicalRecord: {
    },

    examination: {
        MaKB: '',
        MaBN: '',
        TenBN: '',
        MaBS: '',
        TenBS: '',
        ThoiGian: '',
        YTaThamGia:'',
        DichVuSuDung: '',
        ThietBiSuDung: '',
    },

    treatments:[
        {
            MaCB: '',
            MaBN: '',
            TenBN: '',
            MaBS: '',
            TenBS: '',
            ThoiGian: '',
            KetLuan: '',
            YTaThamGia:'',
            DichVuSuDung: '',
            ThietBiSuDung: '',
        }
    ],
    
    departments: [],

    isShowDetailMedicalRecordModal: false,
    isShowCreateMedicalRecordModal: false,
    isShowUpdateMedicalRecordModal: false,
    isShowDeteleMedicalRecordModal: false,
}

const medicalRecordReducer = (state = initState, action) => {
    switch (action.type) {
        // GET_MEDICAL_RECORDS_SUCCESS
        case medicalRecordAction.GET_MEDICAL_RECORDS_SUCCESS:
            return {
                ...state,
                medicalRecords: action.value,
            }
        case medicalRecordAction.GET_MEDICAL_RECORDS_FAIL:
            return {
                ...state,
                medicalRecords: [],
            }
        case medicalRecordAction.GET_MEDICAL_RECORDS_BY_PAGING_SUCCESS:
            return {
                ...state,
                medicalRecords: action.value,
            }
        case medicalRecordAction.GET_MEDICAL_RECORDS_BY_PAGING_FAIL:
            return {
                ...state,
                medicalRecords: [],
            }
        case medicalRecordAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        
        case medicalRecordAction.SELECT_MEDICAL_RECORD:
            return {
                ...state,
                selectedMedicalRecord: action.value
            }

        case medicalRecordAction.SHOW_DETAIL_MEDICAL_RECORD_MODAL:
            return {
                ...state,
                isShowDetailMedicalRecordModal: true
            }

        case medicalRecordAction.HIDE_DETAIL_MEDICAL_RECORD_MODAL:
            return {
                ...state,
                isShowDetailMedicalRecordModal: false
            }

        // GET_EXAM_DETAIL_SUCCESS
        case medicalRecordAction.GET_EXAM_DETAIL_SUCCESS:
            return {
                ...state,
                examination: action.value,
            }
        case medicalRecordAction.GET_EXAM_DETAIL_FAIL:
            return {
                ...state,
                examination: {
                    MaCB: '',
                    MaBN: '',
                    TenBN: '',
                    MaBS: '',
                    TenBS: '',
                    ThoiGian: '',
                    KetLuan: '',
                    YTaThamGia:'',
                    DichVuSuDung: '',
                    ThietBiSuDung: '',
                },
            }

        case medicalRecordAction.SHOW_CREATE_MEDICAL_RECORD_MODAL:
            return {
                ...state,
                isShowCreateMedicalRecordModal: true
            }

        case medicalRecordAction.HIDE_CREATE_MEDICAL_RECORD_MODAL:
            return {
                ...state,
                isShowCreateMedicalRecordModal: false
            }

        case medicalRecordAction.GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.value,
            }
        case medicalRecordAction.GET_DEPARTMENTS_FAIL:
            return {
                ...state,
                departments: [],
            }

        case medicalRecordAction.SHOW_UPDATE_MEDICAL_RECORD_MODAL:
            return {
                ...state,
                isShowUpdateMedicalRecordModal: true
            }

        case medicalRecordAction.HIDE_UPDATE_MEDICAL_RECORD_MODAL:
            return {
                ...state,
                isShowUpdateMedicalRecordModal: false
            }

        case medicalRecordAction.SHOW_DELETE_MEDICAL_RECORD_MODAL:
            return {
                ...state,
                isShowDeleteMedicalRecordModal: true
            }
        case medicalRecordAction.HIDE_DELETE_MEDICAL_RECORD_MODAL:
            return {
                ...state,
                isShowDeleteMedicalRecordModal: false
            }

        default:
            return state;
    }
}

export default medicalRecordReducer;