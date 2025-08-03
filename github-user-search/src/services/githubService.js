import axios from 'axios';

export const fetchUserData = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=20`;

  try {
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    console.error("GitHub search error:", error);
    throw error;
  }
};
