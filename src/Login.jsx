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
      console.log("Login successful:", response.data);
      alert("Login successful");
      // Store token if needed
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // or your dashboard route
    } catch (error) {
      console.error("Login error:", error.response?.data);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");
  const response =  axios.get("http://localhost:5000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Profile data:", response.data);

  return (
    <div className="flex flex-col bg-gradient-to-tr from-blue-500 to-black justify-center items-center w-full min-h-screen py-4 px-4 sm:py-8">
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 sm:mb-8 text-center">
        Near<span className="text-blue-500">Fix</span>
      </h2>

      <div className="bg-white/20 backdrop-blur-lg font-bold border border-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg text-white">
        <h1 className="text-blue-500 bold text-2xl sm:text-3xl mb-1">Welcome Back</h1>
        <p className="text-white/70 text-xs sm:text-sm mb-4 sm:mb-6">Login to your account</p>

        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="text-white/80 text-xs sm:text-sm mb-1 sm:mb-2 block">
              Email Address or Phone
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="Enter email or phone number"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/50"
            />
          </div>

          {/* Password Input with Toggle */}
          <div>
            <label className="text-white/80 text-xs sm:text-sm mb-1 sm:mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white text-lg"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <label className="flex items-center gap-2 text-white/80 text-xs sm:text-sm cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded cursor-pointer"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-blue-300 hover:text-blue-200 text-xs sm:text-sm hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-blue-500 hover:text-white font-bold py-2 px-4 text-sm sm:text-base rounded-lg transition-colors duration-300 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 sm:gap-3 my-2 sm:my-3">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Social Login Options */}
          <div className="flex gap-2 flex-col sm:flex-row">
            <button
              type="button"
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white py-2 px-3 text-xs sm:text-sm rounded-lg transition-colors font-semibold"
            >
              Google
            </button>
            <button
              type="button"
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white py-2 px-3 text-xs sm:text-sm rounded-lg transition-colors font-semibold"
            >
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-xs sm:text-sm text-white/80 mt-3 sm:mt-4 text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-300 hover:text-blue-200 hover:underline cursor-pointer font-semibold"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;