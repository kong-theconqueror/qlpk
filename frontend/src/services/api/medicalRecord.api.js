import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class MedicalRecordApi {
    getMedicalRecords(data) {
        return axiosSerivce.get(
            `ho_so_benh_an?MaBN=${data.MaBN}`,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

    createMedicalRecord(data) {
        return axiosSerivce.post(
            'ho_so_benh_an',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

     updateMedicalRecord(data) {
        return axiosSerivce.put(
            'ho_so_benh_an',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }


    deleteMedicalRecord(id) {
        return axiosSerivce.delete(
            'ho_so_benh_an/'+ id,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const medicalRecordApi = new MedicalRecordApi()

export default medicalRecordApi;