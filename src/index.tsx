import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './fonts.css';

// Wait for fonts and critical assets to load before rendering
const waitForAssets = (): Promise<void> => {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }

  const promises: Promise<void>[] = [];

  // Wait for fonts to load with timeout
  if (document.fonts && document.fonts.ready) {
    const fontPromise = Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 3000)) // 3 second timeout
    ]).then(() => {
      document.documentElement.classList.add('fonts-loaded');
    }).catch(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
    promises.push(fontPromise);
  } else {
    // Fallback: assume fonts are loaded after a short delay
    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          document.documentElement.classList.add('fonts-loaded');
          resolve();
        }, 100);
      })
    );
  }

  return Promise.all(promises).then(() => {
    // All critical assets loaded
    document.documentElement.classList.add('assets-loaded');
  }).catch(() => {
    // Still show content even if some assets fail
    document.documentElement.classList.add('assets-loaded');
  });
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Load critical assets before rendering
waitForAssets().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}); 