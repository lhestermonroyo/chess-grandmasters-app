import { type FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router';

import Home from './pages/Home';
import Profile from './pages/Profile';

import './App.css';
import 'antd/dist/reset.css';

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
