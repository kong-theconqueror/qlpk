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
}

const doctorApi = new DoctorApi()

export default doctorApi;