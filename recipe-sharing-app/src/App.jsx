import React from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Recipe Finder</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
}

export default App;
