import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Add this import
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>

            {/* ✅ Use Link to route to recipe detail or edit */}
            <Link to={`/edit/${recipe.id}`}>Edit</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
