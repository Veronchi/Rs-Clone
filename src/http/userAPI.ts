import jwt_decode, { JwtPayload } from 'jwt-decode';
import { $host, $authHost } from './index';

const registration = async (login: string, email: string, password: string):Promise<JwtPayload> => {
  const { data } = await $host.post('/user/registration', {
    email,
    login,
    password,
  });

  localStorage.setItem('token', data.token);

  return jwt_decode(data.token);
};

const logIn = async (login: string, password: string):Promise<JwtPayload> => {
  const { data } = await $host.post('/user/login', {
    login,
    password,
  });

  localStorage.setItem('token', data.token);

  return jwt_decode(data.token);
};

const check = async ():Promise<JwtPayload> => {
  const result = await $authHost.get('/user/auth');

  localStorage.setItem('token', result.data.token);

  return jwt_decode(result.data.token);
};

export { registration, logIn, check };
