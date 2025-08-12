export default function App() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50">
      <div className="rounded-2xl p-8 shadow-xl bg-white">
        <h1 className="text-3xl font-bold text-emerald-600">
          Recipe Sharing Platform
        </h1>
        <p className="mt-2 text-slate-600">
          Tailwind is working 🎉 — next: build Home, Detail, and Add Recipe pages.
        </p>
        <button className="mt-6 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
          Get Started
        </button>
      </div>
    </div>
  );
}
