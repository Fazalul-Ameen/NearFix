import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkerById } from "../services/workerService";
import { createBooking } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { Star, MapPin, Briefcase, Calendar, Clock, PenTool, ShieldCheck, Mail, Phone, ChevronLeft } from "lucide-react";

function WorkerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "10:00 AM",
    description: "",
    address: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    async function loadWorker() {
      try {
        const data = await getWorkerById(id);
        setWorker(data);
        // Autofill default booking address with customer's address
        if (user) {
          const userAddress = [user.streetAddress, user.city, user.state, user.pinCode]
            .filter(Boolean)
            .join(", ");
          setBookingForm((prev) => ({ ...prev, address: userAddress || "" }));
        }
      } catch (err) {
        setError(err.message || "Failed to load worker details.");
      } finally {
        setLoading(false);
      }
    }
    loadWorker();
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");
    setBookingSuccess("");

    if (!bookingForm.date) {
      setBookingError("Please select a date for the service.");
      return;
    }
    if (!bookingForm.description.trim()) {
      setBookingError("Please write a brief description of the job.");
      return;
    }
    if (!bookingForm.address.trim()) {
      setBookingError("Please specify the location for the service.");
      return;
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        customerId: user?.id || "demo-cust",
        customerName: user?.fullname || "Demo Customer",
        customerEmail: user?.email || "demo@customer.com",
        customerPhone: user?.phoneNumber || "123-456-7890",
        workerId: worker.id,
        workerName: worker.fullName,
        workerEmail: worker.email,
        serviceType: worker.profession,
        price: worker.price,
        date: bookingForm.date,
        time: bookingForm.time,
        description: bookingForm.description,
        address: bookingForm.address,
      };

      await createBooking(bookingData);
      setBookingSuccess("Booking Request sent successfully! Redirecting to dashboard...");
      setTimeout(() => navigate("/user-dashboard"), 1500);
    } catch (err) {
      setBookingError(err.message || "Booking request failed. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navbar />
        <LoadingSpinner size="large" />
        <Footer />
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center gap-4">
          <p className="text-red-400 text-lg">{error || "Worker details not found."}</p>
          <button onClick={() => navigate("/services")} className="rounded-xl bg-blue-500 text-slate-950 px-4 py-2 font-semibold">
            Back to Worker List
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Back navigation */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition"
        >
          <ChevronLeft size={16} /> Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Worker Profile Details */}
          <section className="space-y-6">
            <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-8 shadow-2xl shadow-black/40">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className="h-16 w-16 rounded-3xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-2xl border border-blue-500/30">
                    {worker.fullName?.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-wide">{worker.fullName}</h1>
                    <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase mt-1">
                      {worker.profession}
                    </p>
                  </div>
                </div>
                {/* Price block */}
                <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 px-5 py-2 text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Rate</p>
                  <p className="text-xl font-bold text-blue-400 mt-0.5">{worker.price}/hr</p>
                </div>
              </div>

              {/* Bio & Description */}
              <div className="mt-8 border-t border-slate-900 pt-6">
                <h3 className="text-lg font-bold text-white mb-3">About {worker.fullName}</h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {worker.bio || "No biography provided by the expert yet."}
                </p>
              </div>

              {/* Fast Stats Row */}
              <div className="grid grid-cols-3 gap-4 mt-8 border-t border-slate-900 pt-6 text-center text-sm">
                <div className="rounded-2xl bg-slate-900/40 p-4 border border-slate-900">
                  <span className="text-slate-500 block uppercase tracking-wider text-xs">Experience</span>
                  <span className="flex items-center justify-center gap-1.5 font-bold text-slate-100 mt-1">
                    <Briefcase size={16} className="text-blue-400" />
                    {worker.experience} Years
                  </span>
                </div>
                <div className="rounded-2xl bg-slate-900/40 p-4 border border-slate-900">
                  <span className="text-slate-500 block uppercase tracking-wider text-xs">Rating</span>
                  <span className="flex items-center justify-center gap-1.5 font-bold text-yellow-500 mt-1">
                    <Star size={16} fill="currentColor" />
                    {worker.rating}
                  </span>
                </div>
                <div className="rounded-2xl bg-slate-900/40 p-4 border border-slate-900">
                  <span className="text-slate-500 block uppercase tracking-wider text-xs">Location</span>
                  <span className="flex items-center justify-center gap-1.5 font-bold text-slate-100 mt-1">
                    <MapPin size={16} className="text-blue-400" />
                    {worker.location}
                  </span>
                </div>
              </div>

              {/* Contact info (Mocked since we shouldn't show raw credentials) */}
              <div className="mt-6 space-y-2 text-sm text-slate-400 border-t border-slate-900 pt-6">
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-400" /> Email: <span className="text-slate-200">{worker.email || "Contact via system"}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-400" /> Phone: <span className="text-slate-200">{worker.phoneNumber || "Contact via system"}</span>
                </p>
              </div>
            </div>
          </section>

          {/* Booking Form Card */}
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-8 shadow-2xl shadow-black/40">
              <h3 className="text-xl font-bold text-white mb-2">Book Service Request</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below. Once submitted, the worker will be notified to review the job.
              </p>

              <form onSubmit={handleBookSubmit} className="space-y-4">
                {bookingError && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-400">
                    {bookingError}
                  </div>
                )}
                {bookingSuccess && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-400">
                    {bookingSuccess}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 pl-11 pr-4 py-3 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <select
                      name="time"
                      value={bookingForm.time}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 pl-11 pr-4 py-3 text-sm text-slate-100 focus:border-blue-500 focus:outline-none appearance-none"
                    >
                      <option value="8:00 AM">Morning (8:00 AM)</option>
                      <option value="10:00 AM">Morning (10:00 AM)</option>
                      <option value="12:00 PM">Noon (12:00 PM)</option>
                      <option value="2:00 PM">Afternoon (2:00 PM)</option>
                      <option value="4:00 PM">Afternoon (4:00 PM)</option>
                      <option value="6:00 PM">Evening (6:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Problem Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Provide details about the issue (e.g. leaking sink faucet, install smart light switch)..."
                    value={bookingForm.description}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Service Address
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    placeholder="Enter full address where the worker is needed..."
                    value={bookingForm.address}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full rounded-2xl bg-blue-500 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                >
                  {bookingLoading ? "Submitting Request..." : "Request Booking Now"}
                </button>
              </form>

              <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500 leading-normal border-t border-slate-900 pt-4">
                <ShieldCheck size={14} className="text-blue-400 shrink-0" />
                <span>By booking, you agree to local terms. Payment is handled upon service completion.</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default WorkerDetails;
