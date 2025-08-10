import { useState } from 'react';
import UserProfile from './components/UserProfile';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Tailwind test heading */}
      <h1 className="text-3xl font-bold underline text-pink-500 text-center my-8">
        Hello Tailwind!
      </h1>

      {/* Show the UserProfile component */}
      <UserProfile />

      <div className="card text-center mt-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
