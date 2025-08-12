import React from "react";

export default function RecipeCard({ recipe, onOpen }) {
  return (
    <button
      onClick={() => onOpen?.(recipe)}
      className="group text-left rounded-2xl overflow-hidden bg-white/80 dark:bg-zinc-900/70 backdrop-blur
                 shadow-sm ring-1 ring-zinc-200/70 dark:ring-white/10
                 transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
        <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-white/90 dark:bg-black/60 text-zinc-800 dark:text-zinc-100">
          ⭐ {recipe.rating.toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
          {recipe.title}
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {recipe.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {recipe.tags?.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200
                         dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-900/40"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            View Recipe
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}
