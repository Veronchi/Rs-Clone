import axios, { InternalAxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:3001/api',
});

const $authHost = axios.create({
  baseURL: 'http://localhost:3001/api',
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
