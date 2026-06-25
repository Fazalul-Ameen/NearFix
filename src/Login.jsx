import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      setError("Email or Phone is required");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      const fallbackUsers = JSON.parse(localStorage.getItem("nearfix_users") || "[]");
      const identifier = formData.identifier.trim().toLowerCase();
      const matchedUser = fallbackUsers.find(
        (user) =>
          user.email?.toLowerCase() === identifier ||
          user.phoneNumber?.toLowerCase() === identifier
      );

      if (matchedUser && matchedUser.password === formData.password) {
        localStorage.setItem("token", "demo-token");
        localStorage.setItem("user", JSON.stringify(matchedUser));
        navigate("/dashboard");
      } else {
        setError(
          error.response?.data?.message ||
            "Login failed. Please check your credentials or server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-tr from-blue-500 to-black justify-center items-center w-full min-h-screen py-4 px-4 sm:py-8">
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 sm:mb-8 text-center text-white">
        Near<span className="text-blue-300">Fix</span>
      </h2>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl shadow-black/30 w-full max-w-sm sm:max-w-md md:max-w-lg text-white">
        <h1 className="text-blue-300 text-3xl sm:text-4xl font-semibold mb-2">Welcome Back</h1>
        <p className="text-slate-300 text-sm sm:text-base mb-6">Login to access your bookings, profile, and service marketplace.</p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-3xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <label className="space-y-2 text-sm text-slate-200">
            Email Address or Phone
            <input
              type="text"
              name="identifier"
              placeholder="Type your email or phone"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Password
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 pr-12 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-300">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-blue-500"
              />
              Remember me
            </label>
            <button type="button" className="text-blue-200 hover:text-white">Forgot password?</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-3 text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-[0.3em]">OR</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-400"
            >
              Create account
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ identifier: "demo@nearfix.com", password: "Demo@123", rememberMe: false });
                setError("");
              }}
              className="rounded-3xl bg-slate-800/90 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
            >
              Demo login
            </button>
          </div>

          <p className="text-center text-slate-400 text-xs">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="font-semibold text-blue-300 hover:text-blue-200"
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;