import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getWorkers } from "../services/workerService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WorkerCard from "../components/WorkerCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, SlidersHorizontal } from "lucide-react";

function Services() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");

  const categories = ["All", "Plumber", "Electrician", "Tutor", "AC Technician"];

  useEffect(() => {
    async function fetchWorkersList() {
      setLoading(true);
      try {
        const data = await getWorkers();
        setWorkers(data);
      } catch (err) {
        console.error("Failed to fetch workers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkersList();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...workers];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter(
        (w) => w.profession?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Search query filter (name, location, bio)
    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.fullName?.toLowerCase().includes(term) ||
          w.location?.toLowerCase().includes(term) ||
          w.profession?.toLowerCase().includes(term) ||
          w.bio?.toLowerCase().includes(term)
      );
    }

    setFilteredWorkers(result);
  }, [workers, activeCategory, searchQuery]);

  // Keep state sync with url search params
  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    const q = searchParams.get("search") || "";
    setActiveCategory(cat);
    setSearchQuery(q);
  }, [searchParams]);

  const handleCategorySelect = (cat) => {
    const params = {};
    if (cat !== "All") params.category = cat;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    const params = {};
    if (activeCategory !== "All") params.category = activeCategory;
    if (val.trim()) params.search = val.trim();
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page title */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Services</p>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Browse Service Professionals
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Find the right contractor, technician, or tutor for your immediate needs.
          </p>
        </div>

        {/* Filter bar */}
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] items-center mb-8 border border-slate-900 bg-slate-950/40 p-4 rounded-2xl">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by worker name, specialty, bio..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Category buttons list */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold border transition ${
                  activeCategory === cat
                    ? "bg-blue-500 text-slate-950 border-blue-500"
                    : "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Workers Grid */}
        {loading ? (
          <div className="py-24">
            <LoadingSpinner size="large" />
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="text-center py-20 rounded-[2rem] border border-slate-900 bg-slate-900/20">
            <p className="text-lg text-slate-400">No matching service professionals found.</p>
            <p className="text-xs text-slate-500 mt-2">
              Try updating your search query or selecting another category filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                onClick={() => navigate(`/worker/${worker.id}`)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Services;
