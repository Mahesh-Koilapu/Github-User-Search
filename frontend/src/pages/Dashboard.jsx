import { useState, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import { useTheme } from '../context/ThemeContext'
import { fetchGitHubUser, fetchRepos, searchUsers } from '../services/githubApi'

const Dashboard = () => {
  const [username, setUsername] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { isDarkMode } = useTheme()

  
  const searchForUser = useCallback(async () => {
    if (!username.trim()) {
      setErrorMessage('Please enter a GitHub username')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const results = await searchUsers(username)
      setSearchResults(results.items || [])
      
      if (!results.items || results.items.length === 0) {
        setErrorMessage('No users found')
        setUserData(null)
        setRepos([])
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('Something went wrong. Please try again.')
    }

    setIsLoading(false)
  }, [username])

  const selectUser = async (userLogin) => {
    setIsLoading(true)
    setErrorMessage('')
    setSearchResults([]) // Clear search results after selection

    try {
      const user = await fetchGitHubUser(userLogin)
      const reposData = await fetchRepos(userLogin)

      setUserData(user)
      setRepos(Array.isArray(reposData) ? reposData : [])
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('Failed to fetch user details.')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (!username.trim()) {
      setSearchResults([])
      setUserData(null)
      setRepos([])
      setErrorMessage('')
      return
    }

    const delayDebounceFn = setTimeout(() => {
      searchForUser()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [username, searchForUser])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchForUser()
    }
  }

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

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results</h3>
            <div className="users-list">
              {searchResults.map((user) => (
                <div 
                  key={user.id} 
                  className="user-item" 
                  onClick={() => selectUser(user.login)}
                >
                  <img src={user.avatar_url} alt={user.login} className="avatar" />
                  <span>{user.login}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
  )
}

export default Dashboard