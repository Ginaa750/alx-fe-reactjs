import React, { useMemo, useState } from "react";
import recipesData from "../data.json";
import RecipeCard from "./RecipeCard";
import SkeletonCard from "./SkeletonCard";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [loading, setLoading] = useState(false);

  // derive tag list from data
  const tags = useMemo(() => {
    const t = new Set(["All"]);
    recipesData.forEach(r => r.tags?.forEach(x => t.add(x)));
    return Array.from(t);
  }, []);

  // filter by query + tag
  const recipes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipesData.filter(r => {
      const matchesQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        (r.tags || []).some(t => t.toLowerCase().includes(q));
      const matchesTag = tag === "All" || (r.tags || []).includes(tag);
      return matchesQ && matchesTag;
    });
  }, [query, tag]);

  // fake loading pulse when filters change (feel-good UX)
  React.useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(id);
  }, [query, tag]);

  const openRecipe = (r) => {
    // wire up to router later; for now, just alert
    alert(`Open details for: ${r.title}`);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-slate-50 to-white
                     dark:from-emerald-950/40 dark:via-zinc-950 dark:to-black">
              <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Header */}
              </div>
            </main>
          );
      }
