import React, { createContext, useMemo, useState } from 'react';

export interface IInitCont {
  isAuth: boolean;
  signIn?: (data: boolean, cb:()=>void) => void;
  signOut?: (cb:()=>void) => void;
}

const initail: IInitCont = { isAuth: false };

export const AuthContex = createContext(initail);

export type ContextProps = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: ContextProps): JSX.Element => {
  const [isAuth, setisAuth] = useState<boolean>(false);

  const signIn = (data: boolean, cb:()=>void): void => {
    setisAuth(data);
    cb();
  };

  const signOut = (cb:()=>void): void => {
    setisAuth(false);
    cb();
  };

  const values:IInitCont = useMemo(() => ({
    isAuth, signIn, signOut,
  }), [isAuth, signIn, signOut]);

  return (
    <AuthContex.Provider value={values}>
      {children}
    </AuthContex.Provider>
  );
};
