import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class ServiceApi {
    getServices(data) {
        return axiosSerivce.get(
            'dich_vu',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const serviceApi = new ServiceApi()

export default serviceApi;