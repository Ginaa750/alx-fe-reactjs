import React from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

const App = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Recipe Sharing App</h1>
      <SearchBar />
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
};

export default App;
