
const GITHUB_API_URL = 'https://api.github.com';


const getHeaders = () => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  return headers;
};

export const searchUsers = async (query) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/search/users?q=${query}&per_page=10`, {
      headers: getHeaders()
    });

    if (!response.ok) {
      return { items: [] };
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching users:', error);
    return { items: [] };
  }
};


export const fetchGitHubUser = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers: getHeaders()
    });

    if (!response.ok) {
      return { message: 'Not Found' };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return { message: 'Error' };
  }
};


export const fetchRepos = async (username) => {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/repos?sort=stars&per_page=5`,
      { headers: getHeaders() }
    );
    
    
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
};

