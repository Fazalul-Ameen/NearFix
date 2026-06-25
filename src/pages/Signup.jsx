import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.streetAddress.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pinCode.trim()
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await signup(formData);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),_transparent_40%)] pointer-events-none" />

        <div className="w-full max-w-2xl z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold tracking-tight text-white">
              Near<span className="text-blue-400">Fix</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Register and start booking service professionals in minutes
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl shadow-black/40">
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400 text-sm mb-6">
              Fill in your details. This address will be used by default for scheduling bookings.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                  {success}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="123-456-7890"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="123 Main St"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    placeholder="Zip Code"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-500 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_0_15px_rgba(59,130,246,0.2)] mt-2"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-slate-400 text-xs mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-semibold text-blue-400 hover:underline"
                >
                  Log in here
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;
