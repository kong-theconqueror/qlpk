import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class ExaminationApi {
    getExaminations(data) {
        return axiosSerivce.get(
            `kham_benh?date=${data.date}`,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

    createExamination(data) {
        return axiosSerivce.post(
            'kham_benh',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

     updateExamination(data) {
        return axiosSerivce.put(
            'kham_benh',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }


    deleteExamination(id) {
        return axiosSerivce.delete(
            'kham_benh/'+ id,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const examinationApi = new ExaminationApi()

export default examinationApi;