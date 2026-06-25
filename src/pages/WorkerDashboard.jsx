import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBookings, updateBookingStatus } from "../services/bookingService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingCard from "../components/BookingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Briefcase, Clock, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

function WorkerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  // Statistics
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    completed: 0,
  });

  const loadWorkerJobs = async () => {
    try {
      const list = await getBookings();
      setBookings(list);

      // Compute statistics
      const pending = list.filter((b) => b.status?.toLowerCase() === "pending").length;
      const accepted = list.filter(
        (b) => b.status?.toLowerCase() === "accepted" || b.status?.toLowerCase() === "confirmed"
      ).length;
      const completed = list.filter((b) => b.status?.toLowerCase() === "completed").length;
      
      setStats({ pending, accepted, completed });
    } catch (err) {
      console.error("Failed to load worker jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role !== "worker") {
      navigate("/worker-register");
      return;
    }
    loadWorkerJobs();
  }, [user]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      // Reload jobs to update UI state
      loadWorkerJobs();
    } catch (err) {
      console.error("Failed to update booking status:", err);
    }
  };

  const getFilteredJobs = () => {
    if (activeTab === "pending") {
      return bookings.filter((b) => b.status?.toLowerCase() === "pending");
    }
    if (activeTab === "active") {
      return bookings.filter(
        (b) => b.status?.toLowerCase() === "accepted" || b.status?.toLowerCase() === "confirmed"
      );
    }
    if (activeTab === "past") {
      return bookings.filter(
        (b) =>
          b.status?.toLowerCase() === "completed" ||
          b.status?.toLowerCase() === "cancelled" ||
          b.status?.toLowerCase() === "rejected"
      );
    }
    return [];
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Worker Portal</p>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Provider Management Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review service requests, accept jobs, and mark assignments completed.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 flex items-center justify-between shadow-xl shadow-black/20">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Requests</p>
              <p className="text-3xl font-extrabold text-yellow-500 mt-2">{stats.pending}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
              <Clock size={22} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 flex items-center justify-between shadow-xl shadow-black/20">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Jobs</p>
              <p className="text-3xl font-extrabold text-blue-400 mt-2">{stats.accepted}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Briefcase size={22} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 flex items-center justify-between shadow-xl shadow-black/20">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Jobs</p>
              <p className="text-3xl font-extrabold text-emerald-500 mt-2">{stats.completed}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={22} />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-900 mb-6">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-4 px-6 font-semibold text-sm border-b-2 transition ${
              activeTab === "pending"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`pb-4 px-6 font-semibold text-sm border-b-2 transition ${
              activeTab === "active"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            In Progress ({stats.accepted})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-4 px-6 font-semibold text-sm border-b-2 transition ${
              activeTab === "past"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Past Jobs ({bookings.length - stats.pending - stats.accepted})
          </button>
        </div>

        {/* Jobs List */}
        <section className="rounded-[2rem] border border-slate-900 bg-slate-950 p-8 shadow-2xl shadow-black/40">
          {loading ? (
            <div className="py-12">
              <LoadingSpinner size="medium" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-3xl">
              <p className="text-slate-400 text-sm">No jobs listed in this section.</p>
              <p className="text-xs text-slate-500 mt-1">New requests from clients will show up here.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredJobs.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isWorkerMode={true}
                  onStatusChange={handleStatusChange}
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

export default WorkerDashboard;
