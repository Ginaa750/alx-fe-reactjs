import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm'; // Only if you have this component

const App = () => {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  useEffect(() => {
    const mockRecipes = [
      { title: 'Jollof Rice', description: 'Spicy and flavorful rice dish' },
      { title: 'Pancakes', description: 'Fluffy breakfast favorite' },
      { title: 'Spaghetti Bolognese', description: 'Classic Italian dish' },
    ];
    setRecipes(mockRecipes);
  }, [setRecipes]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Sharing App</h1>
      <SearchBar />
      <AddRecipeForm /> {/* Include only if the component exists */}
      <RecipeList />
    </div>
  );
};

export default App;
