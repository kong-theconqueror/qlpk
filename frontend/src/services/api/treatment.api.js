import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class TreatmentApi {
    getTreatments(data) {
        return axiosSerivce.get(
            `chua_benh?date=${data.date}`,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

    createTreatment(data) {
        return axiosSerivce.post(
            'chua_benh',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

     updateTreatment(data) {
        return axiosSerivce.put(
            'chua_benh',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }


    deleteTreatment(id) {
        return axiosSerivce.delete(
            'chua_benh/'+ id,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const treatmentApi = new TreatmentApi()

export default treatmentApi;