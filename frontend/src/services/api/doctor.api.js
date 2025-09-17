import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class DoctorApi {
    getDoctors(data) {
        return axiosSerivce.get(
            'doctor',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

    createDoctor(doctor) {
        return axiosSerivce.post(
            'doctor',
            doctor,
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
            'doctor',
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
            'doctor/'+ id,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const doctorApi = new DoctorApi()

export default doctorApi;