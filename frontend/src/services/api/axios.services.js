import axios from 'axios';
import { BASE_API_URI, defaultHeader } from './api.config';

class AxiosService {
    async callService(endpoint, method = 'GET', body = null, respData = true, header = {}) {
        let result = await axios({
            method: method,
            url: `${BASE_API_URI}/${endpoint}`,
            headers: {
                ...defaultHeader,
                ...header,
            },
            data: body
        });

        if (respData) {
            console.log(endpoint, result);
            return result;
        } else {
            return null;
        }
    }

    get(url, data = null, respData = true, headers={}) {
        return this.callService(url, 'GET', data, respData, headers);
    }

    post(url, data = null, respData = true, headers={}) {
        return this.callService(url, 'POST', data, respData, headers);
    }

    put(url, data = null, respData = true, headers={}) {
        return this.callService(url, 'PUT', data, respData, headers);
    }

    push(url, data = null, respData = true, headers={}) {
        return this.callService(url, 'PUSH', data, respData, headers);
    }

    delete(url, data = null, respData = true, headers={}) {
        return this.callService(url, 'DELETE', data, respData, headers);
    }

}

const axiosSerivce = new AxiosService();
export default axiosSerivce;