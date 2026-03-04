/**
 * GitHub API Service
 * 
 * This file handles all GitHub API calls.
 * It fetches user profile data and repositories from GitHub.
 */

// Base URL for GitHub API
const GITHUB_API_URL = 'https://api.github.com';

/**
 * Fetch GitHub user profile by username
 * 
 * @param {string} username - GitHub username to search for
 * @returns {Promise<object>} - User profile data from GitHub
 */
export const fetchGitHubUser = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`);
    
    // Check if response is OK
    if (!response.ok) {
      return { message: 'Not Found' };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return { message: 'Error' };
  }
};

/**
 * Fetch user's repositories from GitHub
 * 
 * @param {string} username - GitHub username
 * @returns {Promise array} - Array of user's repositories
 */
export const fetchRepos = async (username) => {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/repos?sort=stars&per_page=5`
    );
    
    // Check if response is OK
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
};

