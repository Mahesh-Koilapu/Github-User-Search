/**
 * Main entry point for the React application
 * 
 * This file initializes the React app and wraps it with providers
 * for theming and routing functionality.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import '../index.css';

// Render the app to the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ThemeProvider manages dark/light mode globally */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

