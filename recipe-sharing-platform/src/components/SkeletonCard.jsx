import React from "react";

export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-white/70 dark:bg-zinc-900/60 ring-1 ring-zinc-200 dark:ring-white/10">
      <div className="h-48 w-full bg-zinc-200/70 dark:bg-zinc-800" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-zinc-200/70 dark:bg-zinc-800 rounded" />
        <div className="h-3 w-full bg-zinc-200/70 dark:bg-zinc-800 rounded" />
        <div className="h-3 w-5/6 bg-zinc-200/70 dark:bg-zinc-800 rounded" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-14 bg-zinc-200/70 dark:bg-zinc-800 rounded-full" />
          <div className="h-5 w-16 bg-zinc-200/70 dark:bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}
