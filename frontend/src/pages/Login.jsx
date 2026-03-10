import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { loginUser, registerUser } from '../services/authApi';


const Login = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    if (!username.trim() || !password.trim()) {
      setMessage('Please fill in all fields');
      setIsError(true);
      return;
    }

    try {
      setIsLoading(true);

      if (isRegister) {
     
        const data = await registerUser({ username, password });
        
        if (data.message === 'User registered successfully') {
          setMessage('Registration successful! Please login.');
          setIsRegister(false);
          setUsername('');
          setPassword('');
        } else {
          setMessage(data.message || 'Registration failed');
          setIsError(true);
        }
      } else {
        
        const data = await loginUser({ username, password });

        if (data.token) {
         
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          setMessage(data.message || 'Invalid credentials');
          setIsError(true);
        }
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  
  const toggleMode = () => {
    setIsRegister(!isRegister);
    setMessage('');
    setIsError(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className={`auth-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="auth-card">
        
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        
        
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <input 
              type="text" 
              value={username}
              onChange={event => setUsername(event.target.value)} 
              placeholder="Username"
              disabled={isLoading}
            />
          </div>
          
         
          <div className="form-group">
            <input 
              type="password" 
              value={password}
              onChange={event => setPassword(event.target.value)} 
              placeholder="Password"
              disabled={isLoading}
            />
          </div>
          
         
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>

      
        {message && (
          <p className={isError ? 'error-message' : 'success-message'}>
            {message}
          </p>
        )}

        
        <p className="toggle-text">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button 
            type="button" 
            onClick={toggleMode}
            className="toggle-btn"
            disabled={isLoading}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

