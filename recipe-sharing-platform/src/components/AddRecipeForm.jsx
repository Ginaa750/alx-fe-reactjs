import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Helper: split textarea into array.
 * Accepts comma- or newline-separated items. Trims and drops empties.
 */
function splitToList(text) {
  return text
    .split(/\r?\n|,/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AddRecipeForm() {
  const navigate = useNavigate();

  // Controlled fields
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({});

  // Derived arrays (used for live validation hints)
  const ingredients = useMemo(() => splitToList(ingredientsText), [ingredientsText]);
  const instructions = useMemo(() => splitToList(instructionsText), [instructionsText]);

  function validate() {
    const e = {};

    if (!title.trim()) e.title = "Title is required.";
    if (ingredients.length < 2) e.ingredients = "Add at least two ingredients.";
    if (instructions.length < 2) e.instructions = "Add at least two steps.";

    // Optional: sensible upper bounds to prevent super-long entries
    if (title.length > 120) e.title = "Keep the title under 120 characters.";
    if (ingredientsText.length > 2000) e.ingredients = "Ingredients are too long.";
    if (instructionsText.length > 4000) e.instructions = "Instructions are too long.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // Build a recipe object compatible with your detail page (uses "instructions")
    const newRecipe = {
      id: Date.now(), // simple unique id for demo
      title: title.trim(),
      summary:
        instructions[0]
          ? `${instructions[0].replace(/\.$/, "")}.` // quick summary from first step
          : "User submitted recipe",
      image: "https://via.placeholder.com/800x500?text=Recipe+Image",
      ingredients,
      instructions,
      time: undefined,
      servings: undefined,
    };

    // Persist to localStorage (demo storage)
    const existing = JSON.parse(localStorage.getItem("recipes") || "[]");
    existing.unshift(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(existing));

    // Tiny UX touch
    alert("Recipe added!"); // you can replace with a toast later
    navigate("/"); // back to Home
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
            Add a New Recipe
          </h1>
          <Link to="/" className="text-emerald-600 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl bg-white p-6 shadow"
        >
          {/* Title */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Creamy Garlic Chicken"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-5">
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium text-gray-700"
              >
                Ingredients
              </label>
              <span className="text-xs text-gray-500">
                One per line (or comma-separated)
              </span>
            </div>
            <textarea
              id="ingredients"
              rows={6}
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              placeholder={"e.g.\n2 chicken breasts\n3 cloves garlic\n1 cup cream"}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              required
            />
            <div className="mt-1 text-xs text-gray-500">
              {ingredients.length} item{ingredients.length === 1 ? "" : "s"}
            </div>
            {errors.ingredients && (
              <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="instructions"
                className="block text-sm font-medium text-gray-700"
              >
                Instructions
              </label>
              <span className="text-xs text-gray-500">
                One step per line (or comma-separated)
              </span>
            </div>
            <textarea
              id="instructions"
              rows={8}
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              placeholder={"e.g.\nSeason chicken with salt & pepper\nSear in butter until golden\nAdd garlic and cream; simmer 5–7 min"}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              required
            />
            <div className="mt-1 text-xs text-gray-500">
              {instructions.length} step{instructions.length === 1 ? "" : "s"}
            </div>
            {errors.instructions && (
              <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Save Recipe
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setIngredientsText("");
                setInstructionsText("");
                setErrors({});
              }}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Small tip card */}
        <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
          Tip: You can edit this later to upload images and set extras like{" "}
          <span className="font-semibold">prep time</span> or{" "}
          <span className="font-semibold">servings</span>.
        </div>
      </div>
    </main>
  );
}
