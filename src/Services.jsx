import { useState, useEffect } from "react";
import { MapPin, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
import AuthenticatedLayout from "./components/AuthenticatedLayout.jsx";

const availableServices = [
  {
    id: "plumbing",
    title: "Plumbing Repair",
    description: "Fast, reliable plumbing service for leaks, clogs, and installations.",
    price: "$35",
    provider: "AquaFix Team",
  },
  {
    id: "electrical",
    title: "Electrical Work",
    description: "Safe wiring, outlet installation, switches, and light fixture repairs.",
    price: "$45",
    provider: "BrightSpark Pros",
  },
  {
    id: "cleaning",
    title: "Home Cleaning",
    description: "Deep-clean your living spaces with trusted, friendly cleaners.",
    price: "$25",
    provider: "FreshNest Crew",
  },
  {
    id: "painting",
    title: "Wall Painting",
    description: "Interior and exterior paint jobs with professional color advice.",
    price: "$55",
    provider: "ColorWave Services",
  },
];

function Services() {
  const [bookings, setBookings] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nearfix_bookings");
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse bookings:", err);
      }
    }
  }, []);

  const handleBook = async (service) => {
    setBusy(true);
    const newBooking = {
      id: `${service.id}-${Date.now()}`,
      title: service.title,
      provider: service.provider,
      date: new Date().toLocaleDateString(),
      time: "Today, 2:00 PM",
      status: "Confirmed",
      price: service.price,
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem("nearfix_bookings", JSON.stringify(updated));
    setTimeout(() => setBusy(false), 300);
  };

  return (
    <AuthenticatedLayout
      title="Service Marketplace"
      subtitle="Choose a service and book it instantly with one click."
    >
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-3xl bg-slate-950/90 p-6 border border-slate-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Available services</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Book your next appointment</h3>
              </div>
              <div className="rounded-2xl bg-slate-900 px-4 py-3 text-slate-300">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Fast booking</p>
                <p className="font-semibold text-white">Secure checkout</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {availableServices.map((service) => (
                <article key={service.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">{service.title}</p>
                      <p className="mt-2 text-sm text-slate-400">{service.description}</p>
                    </div>
                    <div className="rounded-3xl bg-blue-500 px-4 py-2 text-sm font-semibold text-slate-950">{service.price}</div>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <p className="flex items-center gap-2 text-slate-300">
                      <MapPin size={16} /> {service.provider}
                    </p>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleBook(service)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Book now
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-slate-950/90 p-6 border border-slate-800 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Your requests</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Recent bookings</h3>
              </div>
              <div className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">Live</div>
            </div>

            <div className="mt-6 space-y-4">
              {bookings.length === 0 ? (
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 text-slate-400">
                  No bookings yet. Choose a service to get started.
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{booking.title}</p>
                        <p className="text-sm text-slate-400">{booking.provider}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-blue-300">
                        {booking.status}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <Clock size={14} /> {booking.time}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle2 size={14} /> {booking.date}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-3">Need help?</p>
            <p className="text-slate-300">Reach out to support for expert recommendations, scheduling help, or provider matching.</p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
            >
              Contact support
            </button>
          </div>
        </aside>
      </div>
    </AuthenticatedLayout>
  );
}

export default Services;
