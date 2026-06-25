import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneNumber.trim()) {
      setError("Name, email, and phone are required.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch (error) {
      if (!error.response) {
        const storedUsers = JSON.parse(localStorage.getItem("nearfix_users") || "[]");
        const alreadyExists = storedUsers.some(
          (user) => user.email === formData.email || user.phoneNumber === formData.phoneNumber
        );

        if (alreadyExists) {
          setError("A user with this email or phone number already exists.");
        } else {
          const newUser = { ...formData, name: formData.fullName };
          localStorage.setItem("nearfix_users", JSON.stringify([...storedUsers, newUser]));
          setSuccess("Registration saved locally. Please login.");
          setTimeout(() => navigate("/login"), 900);
        }
      } else {
        setError(error.response?.data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-tr from-black via-slate-950 to-blue-500 justify-center items-center w-full min-h-screen py-4 px-4 sm:py-8">
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 sm:mb-8 text-center text-white">
        Near<span className="text-blue-300">Fix</span>
      </h2>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl shadow-black/30 w-full max-w-sm sm:max-w-md lg:max-w-xl text-white">
        <h1 className="text-blue-300 text-3xl sm:text-4xl font-semibold mb-2">Create account</h1>
        <p className="text-slate-300 text-sm sm:text-base mb-6">Register and start booking service professionals in minutes.</p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {error && <div className="rounded-3xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
          {success && <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-200">
              <span className="text-slate-200">Full Name</span>
              <input
                type="text"
                name="fullName"
                placeholder="Jane Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
            <label className="block text-sm text-slate-200">
              <span className="text-slate-200">Email</span>
              <input
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
          </div>

          <label className="block text-sm text-slate-200">
            <span className="text-slate-200">Phone Number</span>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="123-456-7890"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>

          <label className="block text-sm text-slate-200">
            <span className="text-slate-200">Street Address</span>
            <input
              type="text"
              name="streetAddress"
              placeholder="123 Main St"
              value={formData.streetAddress}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm text-slate-200">
              <span className="text-slate-200">City</span>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
            <label className="block text-sm text-slate-200">
              <span className="text-slate-200">State</span>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
            <label className="block text-sm text-slate-200">
              <span className="text-slate-200">Zip Code</span>
              <input
                type="text"
                name="pinCode"
                placeholder="Zip Code"
                value={formData.pinCode}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-200">
              <span className="text-slate-200">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
            <label className="block text-sm text-slate-200">
              <span className="text-slate-200">Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-3xl bg-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-slate-400 text-xs">
            Already have an account?{' '}
            <button
              type="button"
              className="font-semibold text-blue-300 hover:text-blue-200"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;