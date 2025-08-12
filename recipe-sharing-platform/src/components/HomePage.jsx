import React, { useState, useEffect } from "react";
import recipesData from "../data.json"; // Import mock data directly

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  // Load recipes into state
  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-emerald-600 mb-8 text-center">
        Recipe Sharing Platform
      </h1>

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm">{recipe.summary}</p>
              <button className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
