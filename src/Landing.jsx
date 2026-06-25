import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.28),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">NearFix</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Home service booking with confidence.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Connect with trusted professionals for plumbing, electrical, cleaning and repairs. Easy booking, reliable updates, and a clean user experience from signup to service completion.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center rounded-3xl bg-blue-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 px-8 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-500"
              >
                Signup
              </button>
            </div>
          </header>

          <section className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/90 p-10 shadow-2xl shadow-black/30">
              <h2 className="text-3xl font-semibold text-white">Everything you need for home maintenance</h2>
              <p className="mt-4 text-slate-300">
                NearFix bundles everything a homeowner needs: easy service discovery, secure booking, order tracking, and an account portal for managing appointments.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
                  <p className="text-base font-semibold text-white">Trusted providers</p>
                  <p className="mt-2 text-slate-400">Only verified professionals with service ratings and fast availability.</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
                  <p className="text-base font-semibold text-white">Instant booking</p>
                  <p className="mt-2 text-slate-400">Pick a service, confirm a time, and track progress in your account dashboard.</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
                  <p className="text-base font-semibold text-white">Personalized care</p>
                  <p className="mt-2 text-slate-400">Save your address and preferences so every request is ready to go.</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
                  <p className="text-base font-semibold text-white">Secure data</p>
                  <p className="mt-2 text-slate-400">Local account support for demo use, with API integration available when your backend is ready.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/95 p-8 shadow-2xl shadow-black/30">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-400">How it works</p>
              <ol className="mt-6 space-y-5 text-slate-300">
                <li className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-4">
                  <p className="text-sm font-semibold text-white">Create your account</p>
                  <p className="mt-2 text-sm">Sign up with your email or phone, then save your profile details for faster booking.</p>
                </li>
                <li className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-4">
                  <p className="text-sm font-semibold text-white">Choose a service</p>
                  <p className="mt-2 text-sm">Browse trusted home services and book the one you need instantly.</p>
                </li>
                <li className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-4">
                  <p className="text-sm font-semibold text-white">Track requests</p>
                  <p className="mt-2 text-sm">View upcoming appointments and booking status from your dashboard.</p>
                </li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Landing;