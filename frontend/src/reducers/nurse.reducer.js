import { nurseAction } from '../actions';

const initState = {
    nurses: [],
    page: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10,
}

const nurseReducer = (state = initState, action) => {
    switch (action.type) {
        case nurseAction.GET_NURSES_SUCCESS:
            return {
                ...state,
                nurses: action.value,
            }
        case nurseAction.GET_NURSES_FAIL:
            return {
                ...state,
                nurses: [],
            }
        case nurseAction.GET_NURSES_BY_PAGING_SUCCESS:
            return {
                ...state,
                nurses: action.value,
            }
        case nurseAction.GET_NURSES_BY_PAGING_FAIL:
            return {
                ...state,
                nurses: [],
            }
        case nurseAction.PAGE_CHANGE:
            return {
                ...state,
                page: action.value,
            }
        default:
            return state;
    }
}

export default nurseReducer;