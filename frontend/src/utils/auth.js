import axios from 'axios';
const API_BASE = 'http://localhost:5000/api';

export const saveToken   = (t) => localStorage.setItem('clinikx_token', t);
export const getToken    = ()  => localStorage.getItem('clinikx_token');
export const removeToken = ()  => localStorage.removeItem('clinikx_token');
export const isLoggedIn  = ()  => !!getToken();
export const getUser     = ()  => {
  try { return JSON.parse(atob(getToken().split('.')[1])); } catch { return null; }
};

export const authAxios = axios.create({ baseURL: API_BASE });
authAxios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});