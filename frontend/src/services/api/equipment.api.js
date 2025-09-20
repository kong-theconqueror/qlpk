import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class EquipmentApi {
    getEquipments(data) {
        return axiosSerivce.get(
            'thiet_bi_y_te',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const equipmentApi = new EquipmentApi()

export default equipmentApi;