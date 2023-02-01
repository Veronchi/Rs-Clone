import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { MainLayout } from './components/MainLayout/MainLayout';
import { RegistrationLayout } from './components/RegistrationLayout/RegistrationLayout';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/registration" element={<RegistrationLayout />} />
    </Routes>

  );
}

export default App;
