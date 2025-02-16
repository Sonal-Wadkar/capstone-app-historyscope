import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Log from './pages/Log';
import Signup from './pages/Signup';
import Travel from './pages/Travel';
import RefreshHandler from './components/RefreshHandler.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} /> {/* Correct usage of RefreshHandler */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/home' element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Log />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/travel-planner" element={<Travel />} />
      </Routes>
    </>
  );
}

export default App;
