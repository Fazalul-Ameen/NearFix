import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      setError("Email or Phone number is required");
      return;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    try {
      await login(formData.identifier, formData.password);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Check server or connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15),_transparent_40%)] pointer-events-none" />

        <div className="w-full max-w-md z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold tracking-tight text-white">
              Near<span className="text-blue-400">Fix</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Service management for every home
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl shadow-black/40">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-sm mb-6">
              Sign in to manage appointments, contact workers, or offer your services.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                  Email Address or Phone Number
                </label>
                <input
                  type="text"
                  name="identifier"
                  placeholder="name@example.com or 123-456-7890"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your account password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 pr-12 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-950"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-blue-400 hover:underline">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              <div className="flex items-center gap-3 text-slate-700 py-2">
                <span className="h-px flex-1 bg-slate-800" />
                <span className="text-[10px] uppercase tracking-widest font-bold">OR DEMO</span>
                <span className="h-px flex-1 bg-slate-800" />
              </div>

              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      identifier: "demo@nearfix.com",
                      password: "Demo@123",
                    });
                    setError("");
                  }}
                  className="w-full rounded-2xl bg-slate-800 text-sm font-semibold text-slate-200 py-3 transition hover:bg-slate-700 border border-slate-700/50"
                >
                  Fill Demo Credentials
                </button>
              </div>

              <p className="text-center text-slate-400 text-xs mt-4">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-semibold text-blue-400 hover:underline"
                >
                  Create one here
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

export default Login;
