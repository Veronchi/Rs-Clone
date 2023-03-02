import axios, { InternalAxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: 'https://http-nodejs-production-74a9.up.railway.app/api',
});

const $authHost = axios.create({
  baseURL: 'https://http-nodejs-production-74a9.up.railway.app/api',
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
