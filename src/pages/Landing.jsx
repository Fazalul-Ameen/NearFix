import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 w-full">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-400">NearFix Marketplace</p>
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-none">
                Home service booking <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">with confidence.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Connect with trusted professionals for plumbing, electrical, cleaning and repairs. Easy booking, reliable updates, and a clean user experience from signup to service completion.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 hover:scale-102 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                Login to Account
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 px-8 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-blue-500/40 hover:bg-slate-900/80"
              >
                Register Now
              </button>
            </div>
          </header>

          <section className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-slate-900 bg-slate-950/60 backdrop-blur-sm p-8 sm:p-10 shadow-2xl shadow-black/40 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Everything you need for home maintenance</h2>
                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  NearFix bundles everything a homeowner needs: easy service discovery, secure booking, order tracking, and a comprehensive dashboard for managing appointments.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-900 bg-slate-950/90 p-6">
                  <p className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">Trusted providers</p>
                  <p className="mt-2 text-sm text-slate-400">Only verified professionals with rating sheets and prompt scheduling.</p>
                </div>
                <div className="rounded-3xl border border-slate-900 bg-slate-950/90 p-6">
                  <p className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">Instant booking</p>
                  <p className="mt-2 text-sm text-slate-400">Pick a service, describe the problem, and schedule in seconds.</p>
                </div>
                <div className="rounded-3xl border border-slate-900 bg-slate-950/90 p-6">
                  <p className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">Personalized care</p>
                  <p className="mt-2 text-sm text-slate-400">Save address and account preferences so every booking is seamless.</p>
                </div>
                <div className="rounded-3xl border border-slate-900 bg-slate-950/90 p-6">
                  <p className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">Secure data</p>
                  <p className="mt-2 text-sm text-slate-400">Local database fallback for testing, ready to connect with your server.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-900 bg-slate-950/60 backdrop-blur-sm p-8 sm:p-10 shadow-2xl shadow-black/40 flex flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-400 font-semibold">How it works</p>
                <ol className="mt-8 space-y-6 text-slate-300">
                  <li className="rounded-2xl border border-slate-900 bg-slate-950/80 p-5">
                    <p className="text-sm font-bold text-white">1. Create your account</p>
                    <p className="mt-1 text-sm text-slate-400">Register with your name, phone and default address for automated scheduling.</p>
                  </li>
                  <li className="rounded-2xl border border-slate-900 bg-slate-950/80 p-5">
                    <p className="text-sm font-bold text-white">2. Select an expert</p>
                    <p className="mt-1 text-sm text-slate-400">Browse categories or search professionals based on location, rate and experience.</p>
                  </li>
                  <li className="rounded-2xl border border-slate-900 bg-slate-950/80 p-5">
                    <p className="text-sm font-bold text-white">3. Track and complete</p>
                    <p className="mt-1 text-sm text-slate-400">Follow the booking status live, and track completion notes right from your portal.</p>
                  </li>
                </ol>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
