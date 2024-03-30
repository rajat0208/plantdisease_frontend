import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard'; 
import Login from './auth/login'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />  
      </Routes>
    </Router>
  );
};

export default App;
