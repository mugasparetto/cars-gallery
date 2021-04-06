import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/mugasparetto/fake-api-fuel-management',
});

export default api;
