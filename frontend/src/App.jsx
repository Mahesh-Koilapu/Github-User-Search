/**
 * Main Application Component
 * 
 * This is the root component that sets up routing for the application.
 * It handles navigation between the login page and the protected dashboard.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeInitializer from './components/ThemeInitializer';

/**
 * Main App component that defines all routes
 * 
 * Routes:
 * - /login - Public login/register page
 * - / - Protected dashboard (requires authentication)
 */
const App = () => {
  return (
    <BrowserRouter>
      {/* Initialize theme on app load */}
      <ThemeInitializer />
      
      <Routes>
        {/* Public route - Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected route - Dashboard (only accessible when logged in) */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

