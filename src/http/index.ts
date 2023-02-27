import axios, { InternalAxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: 'https://http-nodejs-production-a856.up.railway.app/api',
});

const $authHost = axios.create({
  baseURL: 'https://http-nodejs-production-a856.up.railway.app/api',
});

const authInterceptor = async (config:
InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const { headers } = config;
  const TOKEN = localStorage.getItem('token');
  headers.authorization = `Bearer ${TOKEN}`;
  return {
    ...config,
    headers,
  };
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };

// удаленка
// baseURL: 'https://http-nodejs-production-a856.up.railway.app/api',

// baseURL: 'https://http-nodejs-production-a856.up.railway.app/api',

// локалка
// baseURL: 'http://localhost:3001/api'
