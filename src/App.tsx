import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { MainLayout } from './components/MainLayout/MainLayout';
import BoardPage from './pages/BoardPage/BoardPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { BoardsPage } from './pages/BoardsPage/BoardsPage';

const App = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="boards" element={<BoardsPage />} />
      <Route path="/" element={<Navigate to="boards" replace />} />
      <Route path="board" element={<BoardPage />} />
    </Route>
    <Route path="/auth" element={<RegistrationPage />} />
  </Routes>
);

export default App;
