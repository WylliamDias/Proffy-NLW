import axios from 'axios';
const API_URL = 'http://192.168.0.7/3333';

const api = axios.create({
  baseURL: API_URL
});

export default api;
