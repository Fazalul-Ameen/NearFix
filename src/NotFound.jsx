import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 text-center shadow-2xl shadow-black/40">
        <p className="text-sm uppercase tracking-[0.4em] text-blue-400">Page not found</p>
        <h1 className="mt-6 text-6xl font-semibold tracking-tight">404</h1>
        <p className="mt-4 text-slate-300">We couldn’t find the page you’re looking for. The dashboard and booking tools are still waiting.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
