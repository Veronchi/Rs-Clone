import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContex } from './AuthProvider';

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

const RequireAuth = ({
  authenticationPath, outlet,
}: ProtectedRouteProps): JSX.Element => {
  const { isAuth } = useContext(AuthContex);
  // const isAuthenticated = useAuth();
  // eslint-disable-next-line no-debugger
  debugger;

  const token = localStorage.getItem('token');
  if (isAuth || token) {
    return outlet;
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
};

export { RequireAuth };
