import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class PatientApi {
    getPatients(data) {
        return axiosSerivce.get(
            'patient',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const patientApi = new PatientApi()

export default patientApi;