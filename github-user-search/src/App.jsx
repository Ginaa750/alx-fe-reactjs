import React, { useState } from 'react';
import Search from './components/Search';
import { searchUsers } from './services/githubService';

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (params) => {
    setError('');
    setResults([]);

    try {
      const users = await searchUsers(params);
      if (users.length === 0) {
        setError("Looks like we can't find the user");
      } else {
        setResults(users);
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">

      {/* ✅ Tailwind Test */}
      <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-semibold">
        ✅ Tailwind CSS is working!
      </div>

      <Search onSearch={handleSearch} />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 max-w-6xl mx-auto">
        {results.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <img src={user.avatar_url} alt="avatar" className="w-24 h-24 rounded-full mx-auto" />
            <h2 className="text-center font-semibold mt-2">{user.login}</h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="block text-center text-blue-500 hover:underline mt-2"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
