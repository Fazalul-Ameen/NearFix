import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "./components/AuthenticatedLayout.jsx";
import { Mail, Smartphone, MapPin, User, Lock } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      setFormData({
        fullName: parsed.fullName || parsed.name || "",
        email: parsed.email || "",
        phoneNumber: parsed.phoneNumber || parsed.identifier || "",
        streetAddress: parsed.streetAddress || "",
        city: parsed.city || "",
        state: parsed.state || "",
        pinCode: parsed.pinCode || "",
      });
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));

    const storedUsers = JSON.parse(localStorage.getItem("nearfix_users") || "[]");
    const updatedUsers = storedUsers.map((user) => {
      if (user.email === formData.email || user.phoneNumber === formData.phoneNumber) {
        return { ...user, ...formData };
      }
      return user;
    });
    if (updatedUsers.length) {
      localStorage.setItem("nearfix_users", JSON.stringify(updatedUsers));
    }

    setSaved(true);
  };

  return (
    <AuthenticatedLayout
      title="Your Profile"
      subtitle="Update your contact details, address, and account preferences."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSave} className="space-y-6 rounded-3xl bg-slate-950/90 p-6 border border-slate-800 shadow-2xl shadow-black/20">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Personal details</p>
            <h3 className="text-2xl font-semibold text-white">Edit your profile</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-300">
              <span className="flex items-center gap-2 mb-2 font-medium text-slate-100"><User size={16} /> Name</span>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="flex items-center gap-2 mb-2 font-medium text-slate-100"><Mail size={16} /> Email</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="flex items-center gap-2 mb-2 font-medium text-slate-100"><Smartphone size={16} /> Phone</span>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="flex items-center gap-2 mb-2 font-medium text-slate-100"><MapPin size={16} /> Zip code</span>
              <input
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm text-slate-300">
              <span className="block mb-2 font-medium text-slate-100">Street address</span>
              <input
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="block mb-2 font-medium text-slate-100">City</span>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="block mb-2 font-medium text-slate-100">State</span>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
          >
            <Lock size={16} /> Save changes
          </button>
          {saved && <p className="text-sm text-emerald-400">Profile saved locally.</p>}
        </form>

        <aside className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-3">Account stats</p>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-900/90 p-4 text-slate-300">
              <p className="text-sm text-slate-400">Total bookings</p>
              <p className="mt-2 text-3xl font-semibold text-white">{localStorage.getItem("nearfix_bookings") ? JSON.parse(localStorage.getItem("nearfix_bookings")).length : 0}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-4 text-slate-300">
              <p className="text-sm text-slate-400">Current membership</p>
              <p className="mt-2 text-3xl font-semibold text-white">Essential</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-4 text-slate-300">
              <p className="text-sm text-slate-400">Support available</p>
              <p className="mt-2 text-3xl font-semibold text-white">24/7</p>
            </div>
          </div>
        </aside>
      </div>
    </AuthenticatedLayout>
  );
}

export default Profile;
