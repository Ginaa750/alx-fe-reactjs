import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
  },
});

export const fetchUser = (username) => githubApi.get(`/users/${username}`);
