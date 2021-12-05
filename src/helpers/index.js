import axios from 'axios';
import { apiBaseUrl } from '../config';
console.log('apiBaseUrl', apiBaseUrl);
const AxiosInstance = axios.create({
    baseURL: apiBaseUrl,
});

export default AxiosInstance;