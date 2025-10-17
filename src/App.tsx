import React, { Suspense } from 'react';
import './fonts.css';
import './App.css';

// Lazy load the main content component
const MainContent = React.lazy(() => import('./components/MainContent'));

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
    <Suspense fallback={<LoadingFallback />}>
      <MainContent />
    </Suspense>
  );
};

export default App; 