import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getWorkers } from "../services/workerService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import WorkerCard from "../components/WorkerCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, Sparkles } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Plumber", description: "Leaky pipes, unclog drains, and bathroom/kitchen fixture setups." },
    { name: "Electrician", description: "Smart wiring, lighting, outages, outlet setups, and panels." },
    { name: "Tutor", description: "Personalized coaching for school subjects, sciences, and mathematics." },
    { name: "AC Technician", description: "Vent cleaning, cooling refilling, condenser checkups and setups." },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const list = await getWorkers();
        // Sort featured workers by rating descending
        const sorted = [...list].sort((a, b) => b.rating - a.rating);
        setWorkers(sorted.slice(0, 3));
      } catch (err) {
        console.error("Failed to load workers", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/services?category=${encodeURIComponent(categoryName)}`);
  };

  const handleWorkerClick = (workerId) => {
    navigate(`/worker/${workerId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Block */}
        <div className="mb-10 relative overflow-hidden rounded-[2.5rem] border border-slate-900 bg-slate-950 p-8 sm:p-12 shadow-2xl shadow-black/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_35%)] pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {user?.fullname || "User"}!
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Find and book vetted local professionals for repairs, tutoring, electricals, and maintenance in your neighborhood.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search workers by name, skill, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 pl-12 pr-28 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
                />
                <button
                  type="submit"
                  className="absolute right-2 rounded-xl bg-blue-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-blue-400 transition"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Categories Block */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Service Categories</h2>
              <p className="text-xs text-slate-400 mt-1">Select a specialty to find matching local experts</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <ServiceCard
                key={cat.name}
                name={cat.name}
                description={cat.description}
                onClick={() => handleCategoryClick(cat.name)}
              />
            ))}
          </div>
        </section>

        {/* Featured Experts */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-blue-400 h-5 w-5" />
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Top Rated Professionals</h2>
              <p className="text-xs text-slate-400 mt-1">Highly-recommended local experts with top review scores</p>
            </div>
          </div>

          {loading ? (
            <div className="py-12">
              <LoadingSpinner size="medium" />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  onClick={() => handleWorkerClick(worker.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
