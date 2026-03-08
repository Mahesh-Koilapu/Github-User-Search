import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const { isDarkMode, toggleDarkMode } = useTheme()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1>GitHub Search App</h1>

        <div className="header-actions">
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {token && (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header