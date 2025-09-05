import { serviceAction } from '../actions';

const initState = {
    services: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const serviceReducer = (state = initState, action) => {
    switch (action.type) {
        case serviceAction.GET_SERVICES_SUCCESS:
            return {
                ...state,
                services: action.value,
            }
        case serviceAction.GET_SERVICES_FAIL:
            return {
                ...state,
                services: [],
            }
        case serviceAction.GET_SERVICES_BY_PAGING_SUCCESS:
            return {
                ...state,
                services: action.value,
            }
        case serviceAction.GET_SERVICES_BY_PAGING_FAIL:
            return {
                ...state,
                services: [],
            }
        case serviceAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default serviceReducer;