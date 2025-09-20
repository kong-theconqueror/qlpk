import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class DoctorApi {
    getDoctors(data) {
        return axiosSerivce.get(
            'bac_sy',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

    createDoctor(bac_sy) {
        return axiosSerivce.post(
            'bac_sy',
            bac_sy,
            true,
            {
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

     updateDoctor(data) {
        return axiosSerivce.put(
            'bac_sy',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }


    deleteDoctor(id) {
        return axiosSerivce.delete(
            'bac_sy/'+ id,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const bac_syApi = new DoctorApi()

export default bac_syApi;