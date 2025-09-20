import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class RevenueApi {
    getRevenues(data) {
        return axiosSerivce.get(
            `doanh_thu/${data.year}`,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const revenueApi = new RevenueApi()

export default revenueApi;