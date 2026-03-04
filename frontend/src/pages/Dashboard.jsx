import { useState } from 'react';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isDarkMode } = useTheme();

  const searchForUser = async () => {
    if (!username.trim()) {
      setErrorMessage('Please enter a GitHub username');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const headers = {
        'Accept': 'application/vnd.github.v3+json'
      };

      // Use token from environment variable if available
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
      const user = await userResponse.json();

      if (userResponse.status === 404) {
        setErrorMessage('User not found');
        setUserData(null);
        setRepos([]);
        setIsLoading(false);
        return;
      }

      if (user.message) {
        setErrorMessage(user.message);
        setUserData(null);
        setRepos([]);
        setIsLoading(false);
        return;
      }

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=5`,
        { headers }
      );
      const reposData = await reposResponse.json();

      setUserData(user);
      setRepos(Array.isArray(reposData) ? reposData : []);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }

    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchForUser();
    }
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Header />
      <div className="dashboard-container">
        <h2>Search GitHub User</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={searchForUser} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {isLoading && <p className="loading">Loading...</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        {userData && (
          <div className="user-profile">
            <img src={userData.avatar_url} alt={userData.login} className="avatar" />
            <h3>{userData.name || userData.login}</h3>
            {userData.bio && <p className="bio">{userData.bio}</p>}
            <div className="stats">
              <p>Followers: {userData.followers}</p>
              <p>Following: {userData.following}</p>
              <p>Public Repos: {userData.public_repos}</p>
            </div>
            {userData.location && <p>Location: {userData.location}</p>}
          </div>
        )}

        {repos.length > 0 && (
          <div className="repositories">
            <h3>Top 5 Repositories</h3>
            {repos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <strong>{repo.name}</strong>
                </a>
                <p>{repo.description || 'No description'}</p>
                <div className="repo-stats">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🔀 {repo.forks_count}</span>
                  <span>📚 {repo.language}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

