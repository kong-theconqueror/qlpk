import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class SalaryApi {
    getDoctorSalaries(data) {
        return axiosSerivce.get(
            `luong/bac_sy/${data.month}/${data.year}`,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }

    getNurseSalaries(data) {
        return axiosSerivce.get(
            `luong/y_ta/${data.month}/${data.year}`,
            null,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const salaryApi = new SalaryApi()

export default salaryApi;