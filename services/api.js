import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

const api = axios.create({
    baseURL: 'RPB_IP/api',
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

