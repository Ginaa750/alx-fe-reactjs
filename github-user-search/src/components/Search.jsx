import React, { useState } from 'react';

function Search({ onSearch }) {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [tips] = useState([
    'Search by GitHub username',
    'Filter by location (optional)',
    'Set a minimum number of repos'
  ]);
  const [showTips, setShowTips] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ username, location, minRepos });
    setShowTips(false); // Example condition to toggle tips
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </form>

      {/* ✅ Conditional rendering with && */}
      {showTips && (
        <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
          {/* ✅ Mapping with .map */}
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
