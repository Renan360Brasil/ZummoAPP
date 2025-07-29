import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.zummo.com.br/_app/'
});

export default api;