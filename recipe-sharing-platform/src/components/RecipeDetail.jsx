import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isActive = true;

    async function load() {
      try {
        const res = await fetch("/data.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load data.json");
        const all = await res.json();

        const found = all.find((r) => String(r.id) === String(id));

        if (!isActive) return;

        if (found) {
          setRecipe(found);
          setStatus("ready");
        } else {
          setStatus("not-found");
        }
      } catch (e) {
        console.error(e);
        if (isActive) setStatus("error");
      }
    }

    load();
    return () => {
      isActive = false;
    };
  }, [id]);

  if (status === "loading") {
    return <p className="p-4 text-center text-gray-500">Loading recipe…</p>;
  }

  if (status === "error") {
    return <p className="p-4 text-center text-red-500">Error loading recipe.</p>;
  }

  if (status === "not-found") {
    return <p className="p-4 text-center text-gray-500">Recipe not found.</p>;
  }

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <Link
        to="/"
        className="text-emerald-600 hover:underline inline-block mb-4"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <p className="mt-2 text-gray-700">{recipe.summary}</p>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="mt-6 rounded-xl shadow-md w-full object-cover"
        />
      )}

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-800">
          {(recipe.ingredients ?? []).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-4 text-gray-800 leading-relaxed">
          {(recipe.instructions ?? []).map((step, i) => (
            <li key={i} className="marker:font-semibold">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
