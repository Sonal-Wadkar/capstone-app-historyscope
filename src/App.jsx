import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Log from './pages/Log';
import Signup from './pages/Signup';
import Travel from './pages/Travel';
import ArtGallery from './pages/ArtGallery.jsx';
import Event from './pages/Event.jsx';
import RefreshHandler from './components/RefreshHandler.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., token exists)
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Log />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Route for Services */}
        <Route path="/travel-planner" element={<PrivateRoute element={<Travel />} />} />
        <Route path="/art-gallery" element={<PrivateRoute element={<ArtGallery />} />} />
        <Route path="/event-log" element={<PrivateRoute element={<Event />} />} />
      </Routes>
    </>
  );
}

export default App;
