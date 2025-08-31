import { userAction } from '../actions';
import { setLocalData, getLocalData } from '../services/localStorage';

const isLoggedIn = getLocalData('isLoggedIn');
const userId = getLocalData('userId');
const username = getLocalData('username');
const email = getLocalData('email');
const token = getLocalData('token');
const roles = getLocalData('roles');
const idRole = getLocalData('idRole');

const initState = {
    isLoggedIn: isLoggedIn != null ? isLoggedIn : true,
    userId: userId != null ? userId : 0,
    username: username != null ? username : '',
    email: email != null ? email : '',
    token: token != null ? token : '',
    roles: roles != null ? roles : [],
    idRole: idRole != null ? idRole : '',
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userAction.LOG_IN_SUCCESS:
            setLocalData('isLoggedIn', true);
            setLocalData('userId', action.value.userId);
            setLocalData('username', action.value.username);
            setLocalData('email', action.value.email);
            setLocalData('token', action.value.token);
            setLocalData('roles', action.value.roles);
            setLocalData('idRole', action.value.idRole);
            return {
                ...state,
                isLoggedIn: true,
                userId: action.value.userId,
                username: action.value.username,
                email: action.value.email,
                token: action.value.token,
                roles: action.value.roles,
                idRole: action.value.idRole,
            }
        case userAction.LOG_IN_FAIL:
            setLocalData('isLoggedIn', false);
            setLocalData('userId', '');
            setLocalData('username', '');
            setLocalData('email', '');
            setLocalData('token', '');
            setLocalData('roles', []);
            setLocalData('idRole', '');
            return {
                ...state,
                isLoggedIn: false,
                userId: '',
                username: '',
                email: '',
                token: '',
                roles: [],
                idRole: '',
            }
        case userAction.LOG_OUT:
            setLocalData('isLoggedIn', false);
            setLocalData('userId', '');
            setLocalData('username', '');
            setLocalData('email', '');
            setLocalData('token', '');
            setLocalData('roles', []);
            setLocalData('idRole', '');

            console.log('log out!');
            return {
                ...state,
                isLoggedIn: false,
                userId: '',
                username: '',
                email: '',
                token: '',
                roles: [],
                idRole: '',
            }
        default:
            return state;
    }
}

export default userReducer;