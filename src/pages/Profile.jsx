import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Mail, Phone, MapPin, ShieldCheck, Heart, UserCheck } from "lucide-react";

function Profile() {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullname || user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        streetAddress: user.streetAddress || "",
        city: user.city || "",
        state: user.state || "",
        pinCode: user.pinCode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccess("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      // Local storage profile update
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...storedUser,
        fullname: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Sync user in nearfix_users registry
      const localUsers = JSON.parse(localStorage.getItem("nearfix_users") || "[]");
      const updatedUsers = localUsers.map((u) => {
        if (u.email === storedUser.email || u.phoneNumber === storedUser.phoneNumber) {
          return {
            ...u,
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            pinCode: formData.pinCode,
          };
        }
        return u;
      });
      localStorage.setItem("nearfix_users", JSON.stringify(updatedUsers));

      // Refresh AuthContext State
      refreshUser();
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to save changes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Title */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Settings</p>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Personal Account Profile
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit contact numbers, primary mailing address, and verify account standing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Main Edit Form */}
          <section>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-slate-900 bg-slate-950 p-8 shadow-2xl shadow-black/40">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-900 pb-4">
                Update Information
              </h2>

              {success && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                  {success}
                </div>
              )}
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 pl-11 pr-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 pl-11 pr-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 pl-11 pr-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Street Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-900 pl-11 pr-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-blue-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                {loading ? "Saving Changes..." : "Save Profile Details"}
              </button>
            </form>
          </section>

          {/* Sidebar Account Summary */}
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-8 shadow-2xl shadow-black/40">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-900 pb-4">
                Account Status
              </h3>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Verified Provider</span>
                    <span className="text-sm font-bold text-slate-200 mt-1 block">
                      {user?.role === "worker" ? "Active (Expert)" : "No (Customer Account)"}
                    </span>
                  </div>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${
                    user?.role === "worker" 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    <UserCheck size={18} />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Current Tier</span>
                    <span className="text-sm font-bold text-slate-200 mt-1 block">Essential Plan</span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Heart size={18} />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Privacy Standing</span>
                    <span className="text-sm font-bold text-slate-200 mt-1 block">Secured Local Encryption</span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <ShieldCheck size={18} />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
