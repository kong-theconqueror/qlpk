import { equiqmentAction } from '../actions';

const initState = {
    equiqments: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const equiqmentReducer = (state = initState, action) => {
    switch (action.type) {
        case equiqmentAction.GET_EQUIQMENTS_SUCCESS:
            return {
                ...state,
                equiqments: action.value,
            }
        case equiqmentAction.GET_EQUIQMENTS_FAIL:
            return {
                ...state,
                equiqments: [],
            }
        case equiqmentAction.GET_EQUIQMENTS_BY_PAGING_SUCCESS:
            return {
                ...state,
                equiqments: action.value,
            }
        case equiqmentAction.GET_EQUIQMENTS_BY_PAGING_FAIL:
            return {
                ...state,
                equiqments: [],
            }
        case equiqmentAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default equiqmentReducer;