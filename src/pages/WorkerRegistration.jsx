import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerWorker } from "../services/workerService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Wrench, Briefcase, DollarSign, FileText, CheckCircle } from "lucide-react";

function WorkerRegistration() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    profession: "Plumber",
    experience: "",
    phoneNumber: "",
    location: "",
    price: "",
    bio: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      // If user is already a worker, redirect directly to dashboard
      if (user.role === "worker") {
        navigate("/worker-dashboard");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        fullName: user.fullname || user.name || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        location: user.city || "",
      }));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.experience.trim() || isNaN(formData.experience)) {
      setError("Please specify a valid numeric experience (in years).");
      return;
    }
    if (!formData.location.trim()) {
      setError("Please specify your service location/city.");
      return;
    }
    if (!formData.price.trim()) {
      setError("Please set your hourly rate (e.g. $35).");
      return;
    }

    setLoading(true);
    try {
      const data = {
        ...formData,
        price: formData.price.startsWith("$") ? formData.price : `$${formData.price}`,
      };

      await registerWorker(data);
      setSuccess("Congratulations! You are now registered as a NearFix service professional.");
      
      // Update global context so the header and dashboard switch roles
      refreshUser();

      setTimeout(() => {
        navigate("/worker-dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.1),_transparent_40%)] pointer-events-none" />

        <div className="w-full max-w-xl z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
              Become a <span className="text-blue-400">NearFix Partner</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Register your trade skills and get service booking requests from local clients
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl shadow-black/40">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-400 flex items-center gap-2 animate-pulse">
                  <CheckCircle size={16} />
                  {success}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Profession / Skill
                  </label>
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Plumber">Plumber (Wrench)</option>
                    <option value="Electrician">Electrician (Zap)</option>
                    <option value="Tutor">Academic Tutor (Book)</option>
                    <option value="AC Technician">AC Technician (Snowflake)</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Years of Experience
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="experience"
                      placeholder="e.g. 5"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Hourly Charge ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="price"
                      placeholder="e.g. 35"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Service City/Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Dallas, TX"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Professional Biography (Bio)
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 h-4 w-4 text-slate-500" />
                  <textarea
                    name="bio"
                    rows={4}
                    placeholder="Describe your specialties, credentials, tools, and booking policies..."
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-500 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_0_15px_rgba(59,130,246,0.25)] mt-4"
              >
                {loading ? "Submitting Registration..." : "Become Service Partner"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default WorkerRegistration;
