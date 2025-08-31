import { appAction } from '../actions';

const initState = {
    appName: 'eClinic',

    width: document.body.clientWidth,
    height: window.innerHeight,

    contentWidth: document.body.clientWidth - 250 - 20,
    contentHeight: window.innerHeight,
    headerHeight: 65,
    sidebarWidth: 250,
    shrinkedSidebarWidth: 55,
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case appAction.UPDATE_CONTENT_WIDTH:
            return {
                ...state,
                contentWidth: action.value,
            }
        case appAction.UPDATE_CONTENT_HEIGHT:
            return {
                ...state,
                contentHeight: action.value,
            }
        default:
            return state;
    }
}

export default appReducer;