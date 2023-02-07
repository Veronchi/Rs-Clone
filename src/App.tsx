import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { MainLayout } from './components/MainLayout/MainLayout';
import { RegistrationLayout } from './components/RegistrationLayout/RegistrationLayout';
import { BoardsPage } from './pages/BoardsPage/BoardsPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/" element={<Navigate to="/boards" replace />} />
      </Route>
      <Route path="/registration" element={<RegistrationLayout />} />
    </Routes>

  );
}

export default App;
