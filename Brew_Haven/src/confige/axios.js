
import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:4000';

axiosClient.defaults.withCredentials = true;

export default axiosClient 