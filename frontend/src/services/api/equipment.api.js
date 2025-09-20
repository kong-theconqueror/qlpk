import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class EquipmentApi {
    getEquipments(data) {
        return axiosSerivce.get(
            'co_so_vat_chat',
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