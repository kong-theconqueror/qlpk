import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class DiseaseApi {
    getDiseases(data) {
        return axiosSerivce.get(
            'benh',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

    getDiseaseStatistic(data) {
        return axiosSerivce.get(
            `benh/thong_ke/${data.month}/${data.year}`,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const diseaseApi = new DiseaseApi()

export default diseaseApi;