import React from 'react';
import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

const RequireAuth = ({
  isAuthenticated, authenticationPath, outlet,
}: ProtectedRouteProps): JSX.Element => {
  if (isAuthenticated) {
    return outlet;
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
};

export { RequireAuth };
