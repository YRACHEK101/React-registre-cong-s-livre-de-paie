import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import LivreDePaie from './component/LivreDePaie/LivreDePaie';
import RegistreDesCongesPayes from './component/RegistreDesCongesPayes/RegistreDesCongesPayes';
import Login from './component/login/login';
import SignupPage from './component/login/SignupPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/livre-de-paie" element={<LivreDePaie />} />
          <Route path="/registre-des-conges-payes" element={<RegistreDesCongesPayes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignupPage" element={<SignupPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;