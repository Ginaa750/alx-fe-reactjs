import { useState } from 'react';
import { advancedUserSearch } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const data = await advancedUserSearch(username, location, minRepos);
      if (data.length === 0) {
        setError('Looks like we cant find the user');
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Minimum Repositories"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div key={user.id} className="flex items-center space-x-4 p-4 border rounded shadow">
            <img src={user.avatar_url} alt="avatar" className="w-16 h-16 rounded-full" />
            <div>
              <p className="font-bold">Login: {user.login}</p>
              <a href={user.html_url} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
