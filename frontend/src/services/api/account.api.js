import axiosSerivce from './axios.services';
import { getLocalData } from '../localStorage';

class AccountApi {
    countAccounts() {
        const index = 'user-password';
        return axiosSerivce.post(
            'api/account/count',
            { index: index },
            true,
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

    searchAccounts(data) {
        return axiosSerivce.post(
            'api/account/search',
            data,
            true,
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const accountApi = new AccountApi()

export default accountApi;