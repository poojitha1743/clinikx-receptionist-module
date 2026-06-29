import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Soon = ({n}) => (
  <div style={{padding:'2rem', fontFamily:'sans-serif', textAlign:'center'}}>
    <h2 style={{color:'#7B68EE'}}>{n}</h2>
    <p>Coming soon...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Navigate to="/login" replace />} />
        <Route path="/login"        element={<Soon n="Login - M1" />} />
        <Route path="/register"     element={<Soon n="Registration - M2" />} />
        <Route path="/subscription" element={<Soon n="Subscription - M3" />} />
        <Route path="/payment"      element={<Soon n="Payment - M4" />} />
        <Route path="/super-admin"  element={<Soon n="Super Admin - M5/M6" />} />
        <Route path="/clinic-admin" element={<Soon n="Clinic Admin - M7/M8/M9" />} />
        <Route path="/receptionist" element={<Soon n="Receptionist - M10/M11" />} />
        <Route path="/doctor"       element={<Soon n="Doctor - M12/M13" />} />
      </Routes>
    </BrowserRouter>
  );
}