import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/login';
import Register from './pages/user/register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Mengarahkan halaman utama langsung ke /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Route Halaman Login & Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;