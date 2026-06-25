import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBookings, updateBookingStatus } from "../services/bookingService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingCard from "../components/BookingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { LayoutDashboard, Compass, User, ClipboardList, CheckCircle2, Clock } from "lucide-react";

function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
  });

  const loadUserBookings = async () => {
    try {
      const list = await getBookings();
      setBookings(list);

      // Compute statistics
      const total = list.length;
      const pending = list.filter((b) => b.status?.toLowerCase() === "pending").length;
      const completed = list.filter((b) => b.status?.toLowerCase() === "completed").length;
      setStats({ total, pending, completed });
    } catch (err) {
      console.error("Failed to load user bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      // Reload bookings to update UI state
      loadUserBookings();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Dashboard</p>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Client Management Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Track active requests, schedule dates, and review completed service sessions.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/services")}
              className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              Book Service
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-700"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 flex items-center justify-between shadow-xl shadow-black/20">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</p>
              <p className="text-3xl font-extrabold text-white mt-2">{stats.total}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ClipboardList size={22} />
            </div>
          </div>

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
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Jobs</p>
              <p className="text-3xl font-extrabold text-emerald-500 mt-2">{stats.completed}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <CheckCircle2 size={22} />
            </div>
          </div>
        </div>

        {/* Bookings List Section */}
        <section className="rounded-[2rem] border border-slate-900 bg-slate-950 p-8 shadow-2xl shadow-black/40">
          <h3 className="text-xl font-bold text-white mb-6">Service Request History</h3>

          {loading ? (
            <div className="py-12">
              <LoadingSpinner size="medium" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-3xl">
              <p className="text-slate-400 text-sm">You haven't requested any services yet.</p>
              <button
                onClick={() => navigate("/services")}
                className="mt-4 rounded-xl bg-blue-500/10 border border-blue-500/20 px-5 py-2.5 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition"
              >
                Browse Marketplace & Book
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isWorkerMode={false}
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

export default UserDashboard;
