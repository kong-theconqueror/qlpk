import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class DiseaseApi {
    getDiseases(data) {
        return axiosSerivce.get(
            'disease',
            data,
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