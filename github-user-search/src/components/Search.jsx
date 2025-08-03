import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const users = await fetchUserData({ username, location, minRepos });
      setResults(users);
    } catch (err) {
      setError("Loading","Looks like we cant find the user");
      setResults([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <input value={minRepos} onChange={(e) => setMinRepos(e.target.value)} placeholder="Minimum Repos" />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      {results.map((user) => (
        <div key={user.id}>
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="50" />
          <p>{user.login}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
        </div>
      ))}
    </div>
  );
}

export default Search;
