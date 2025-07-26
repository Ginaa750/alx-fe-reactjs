import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (recipe) => {
    const newRecipes = [...get().recipes, recipe];
    set({ recipes: newRecipes });
    get().filterRecipes(); // Update filtered list on add
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term }, false);
    get().filterRecipes();
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredRecipes: filtered });
  },

  setRecipes: (newRecipes) => {
    set({ recipes: newRecipes });
    get().filterRecipes();
  },
}));

export default useRecipeStore;
