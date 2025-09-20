import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class NurseApi {
    getNurses(data) {
        return axiosSerivce.get(
            'y_ta',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const nurseApi = new NurseApi()

export default nurseApi;