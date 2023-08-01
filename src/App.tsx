import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { MainLayout } from './components/MainLayout/MainLayout';
import BoardPage from './pages/BoardPage/BoardPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { BoardsPage } from './pages/BoardsPage/BoardsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import { ProtectedRouteProps, RequireAuth } from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  authenticationPath: '/auth',
};

const App = (): JSX.Element => (
  <AuthProvider>
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Navigate to="boards" replace />} />
        <Route path="boards" element={<RequireAuth {...defaultProtectedRouteProps} outlet={<BoardsPage />} />} />
        <Route path="board" element={<RequireAuth {...defaultProtectedRouteProps} outlet={<BoardPage />} />} />
      </Route>
      <Route path="/auth" element={<RegistrationPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </AuthProvider>

);

export default App;
