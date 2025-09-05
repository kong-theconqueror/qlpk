import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class EquiqmentApi {
    getEquiqments(data) {
        return axiosSerivce.get(
            'equiqment',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const equiqmentApi = new EquiqmentApi()

export default equiqmentApi;