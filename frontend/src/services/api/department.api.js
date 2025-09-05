import axiosSerivce from './axios.services';
// import { getLocalData } from '../localStorage';

class DepartmentApi {
    getDepartments(data) {
        return axiosSerivce.get(
            'department',
            data,
            true,
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getLocalData('token')}`,
            }
        );
    }
}

const departmentApi = new DepartmentApi()

export default departmentApi;