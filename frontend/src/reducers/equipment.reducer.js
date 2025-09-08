import { equipmentAction } from '../actions';

const initState = {
    equipments: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const equipmentReducer = (state = initState, action) => {
    switch (action.type) {
        case equipmentAction.GET_EQUIPMENTS_SUCCESS:
            return {
                ...state,
                equipments: action.value,
            }
        case equipmentAction.GET_EQUIPMENTS_FAIL:
            return {
                ...state,
                equipments: [],
            }
        case equipmentAction.GET_EQUIPMENTS_BY_PAGING_SUCCESS:
            return {
                ...state,
                equipments: action.value,
            }
        case equipmentAction.GET_EQUIPMENTS_BY_PAGING_FAIL:
            return {
                ...state,
                equipments: [],
            }
        case equipmentAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default equipmentReducer;