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

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  isAuthenticated: !!localStorage.getItem('token'),
  authenticationPath: '/auth',
};

const App = (): JSX.Element => (
  <Routes>
    <Route path="/welcome" element={<WelcomePage />} />
    <Route path="/" element={<RequireAuth {...defaultProtectedRouteProps} outlet={<MainLayout />} />}>
      <Route path="boards" element={<BoardsPage />} />
      <Route path="/" element={<Navigate to="boards" replace />} />
      <Route path="board" element={<BoardPage />} />
    </Route>
    <Route path="/auth" element={<RegistrationPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default App;
