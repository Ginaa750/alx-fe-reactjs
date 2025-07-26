import React from 'react';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px' }}>
            <h3>{recipe.title}</h3>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Preparation Time: {recipe.prepTime}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
