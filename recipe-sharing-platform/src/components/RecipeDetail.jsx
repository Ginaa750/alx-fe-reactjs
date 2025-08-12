import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error' | 'not-found'

  useEffect(() => {
    let isActive = true;

    async function load() {
      try {
        setStatus('loading');
        const res = await fetch('/data.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load data.json');
        const all = await res.json();

        // ID in URL is a string; recipe.id might be number or string—normalize both.
        const found = all.find((r) => String(r.id) === String(id));

        if (!isActive) return;

        if (found) {
          setRecipe(found);
          setStatus('ready');
        } else {
          setStatus('not-found');
        }
      } catch (e) {
        console.error(e);
        if (isActive) setStatus('error');
      }
    }

    load();
    return () => { isActive = false; };
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="h-64 w-full animate-pulse rounded-2xl bg-gray-200" />
        <div className="mt-6 space-y-3">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <Link to="/" className="text-indigo-600 hover:underline">&larr; Back to Home</Link>
        <h1 className="mt-4 text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-gray-600">
          Couldn’t load recipes. Make sure <code>public/data.json</code> exists.
        </p>
      </div>
    );
  }

  if (status === 'not-found') {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <Link to="/" className="text-indigo-600 hover:underline">&larr; Back to Home</Link>
        <h1 className="mt-4 text-2xl font-semibold">Recipe not found</h1>
        <p className="mt-2 text-gray-600">The recipe you’re looking for doesn’t exist.</p>
      </div>
    );
  }

  // status === 'ready'
  return (
    <article className="max-w-5xl mx-auto p-4 md:p-8">
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:underline">
        &larr; Back to Home
      </Link>

      <header className="mt-4 md:mt-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{recipe.title}</h1>
        <p className="mt-2 text-gray-600">{recipe.summary}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-700">
          {recipe.time && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">
              ⏱️ {recipe.time}
            </span>
          )}
          {recipe.servings && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">
              🍽️ Serves {recipe.servings}
            </span>
          )}
        </div>
      </header>

      {recipe.image && (
        <div className="mt-6 overflow-hidden rounded-2xl shadow">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      )}

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ingredients */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white shadow p-6">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-800">
              {(recipe.ingredients ?? []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white shadow p-6">
            <h2 className="text-xl font-semibold">Instructions</h2>
            <ol className="mt-4 list-decimal pl-5 space-y-4 text-gray-800 leading-relaxed">
              {(recipe.steps ?? []).map((step, i) => (
                <li key={i} className="marker:font-semibold">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </article>
  );
}
