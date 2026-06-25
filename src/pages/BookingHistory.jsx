import { useState, useEffect } from "react";
import { getBookings } from "../services/bookingService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingCard from "../components/BookingCard";
import LoadingSpinner from "../components/LoadingSpinner";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const list = await getBookings();
        setBookings(list);
      } catch (err) {
        console.error("Failed to load booking history:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Ledger</p>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Complete Booking History
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            A comprehensive list of all your scheduled, cancelled, or completed services.
          </p>
        </div>

        <section className="rounded-[2rem] border border-slate-900 bg-slate-950 p-8 shadow-2xl shadow-black/40">
          {loading ? (
            <div className="py-12">
              <LoadingSpinner size="medium" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-sm">No historical bookings found.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isWorkerMode={false}
                  onStatusChange={() => {}}
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

export default BookingHistory;
