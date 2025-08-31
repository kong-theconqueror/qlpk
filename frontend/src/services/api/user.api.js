import axiosSerivce from './axios.services';
import { getLocalData } from '../localStorage';

class UserApi {
    login(username = '', password = '') {
        return axiosSerivce.post(`admin/user/login`, {
            username: username,
            password: password
        },
            true,
            { 'Content-Type': 'application/json' }
        );
    }

    register(display_name = '', email = '', phone = '', password = '') {
        return axiosSerivce.post(`pub/users/register`, {
            display_name: display_name,
            email: email,
            phone: phone,
            password: password
        },
            true,
            { 'Content-Type': 'application/json' }
        );
    }

    getAllUser() {
        return axiosSerivce.get(
            'admin/user/get_all',
            {},
            true,
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const userApi = new UserApi();
export default userApi;