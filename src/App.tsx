import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './fonts.css';
import './App.css';

// Lazy load components
const MainContent = React.lazy(() => import('./components/MainContent'));
const About = React.lazy(() => import('./components/About'));
const ContactUs = React.lazy(() => import('./components/ContactUs'));

// Loading component
const LoadingFallback: React.FC = () => (
  <div className="app">
    <div className="content">
      <div className="main-text">
        <div className="with-farook" style={{ opacity: 0.7 }}>
          withFarook
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App; 