import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class MedicineApi {
    getMedicines(data) {
        return axiosSerivce.get(
            'medicine',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const medicineApi = new MedicineApi()

export default medicineApi;