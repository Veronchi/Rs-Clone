import jwt_decode, { JwtPayload } from 'jwt-decode';
import { IUser } from '../interfaces';
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

const getUser = async (): Promise<IUser> => {
  const { data } = await $authHost.get('/user');

  return data;
};

const update = async (payload: {
  id: string
  login: string,
  email: string,
  avatar: string }): Promise<boolean> => {
  const { data } = await $authHost.put('user/', payload);

  return !!data;
};

const remove = async (): Promise<void> => {
  await $authHost.delete('user/');
};

const check = async ():Promise<JwtPayload> => {
  const result = await $authHost.get('/user/auth');

  localStorage.setItem('token', result.data.token);

  return jwt_decode(result.data.token);
};

export {
  registration, logIn, getUser, update, check, remove,
};
