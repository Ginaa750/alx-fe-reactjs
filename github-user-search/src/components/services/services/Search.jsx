// src/components/Search.jsx
import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState("");
const [minRepos, setMinRepos] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setUser(null);

  try {
    const data = await fetchUserData(username, location, minRepos);
    setUser(data);
  } catch (err) {
    setError("Looks like we can't find the user.");
  } finally {
    setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    style={{ marginRight: "1rem", padding: "0.5rem" }}
  />
  <input
    type="text"
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    style={{ marginRight: "1rem", padding: "0.5rem" }}
  />
  <input
    type="number"
    placeholder="Min Repos"
    value={minRepos}
    onChange={(e) => setMinRepos(e.target.value)}
    style={{ marginRight: "1rem", padding: "0.5rem" }}
  />
  <button type="submit">Search</button>
</form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt="avatar" width={100} />
          <h3>{userData.name}</h3>
          <a href={userData.html_url} target="_blank">View Profile</a>
        </div>
      )}
    </div>
  );
}

export default Search;
