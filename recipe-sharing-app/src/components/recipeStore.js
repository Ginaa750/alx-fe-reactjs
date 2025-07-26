import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  setRecipes: (recipes) => {
    const { searchTerm } = get();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ recipes, filteredRecipes: filtered });
  },

  setSearchTerm: (term) => {
    const { recipes } = get();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
    set({ searchTerm: term, filteredRecipes: filtered });
  },

  // ✅ New: addRecipe
  addRecipe: (newRecipe) => {
    const { recipes, searchTerm } = get();
    const updatedRecipes = [...recipes, newRecipe];
    const filtered = updatedRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ recipes: updatedRecipes, filteredRecipes: filtered });
  },
}));

export default useRecipeStore;
