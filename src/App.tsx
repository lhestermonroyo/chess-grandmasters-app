import { useState, type FC } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router';

import Home from './pages/Home';
import Profile from './pages/Profile';

const App: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
