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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match before sending
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Sending data:", formData);
    
    try{
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log(response.data);
      alert("Registration successful");
      navigate("/login");
    }catch(error){
      console.error("Full error response:", error.response?.data);
      console.error("Error message:", error.response?.data?.message);
      alert(error.response?.data?.message || "Registration failed");
    }
    
  };

  return (
    <div className="flex flex-col bg-gradient-to-tr from-black to-blue-500 justify-center items-center w-full min-h-screen py-4 px-4 sm:py-8">
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 sm:mb-8 text-center text-white">
        Near<span className="text-blue-500">Fix</span>
      </h2>

      <div className="bg-white/20 backdrop-blur-lg font-bold border border-black p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md text-white">
        <h1 className="text-black bold text-2xl sm:text-3xl mb-2">Create Account</h1>
        <p className="text-black text-xs sm:text-sm mb-4">
          Sign up to find the best service providers
        </p>

        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number *"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address *"
            value={formData.streetAddress}
            onChange={handleChange}
            required
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <input
              type="text"
              name="city"
              placeholder="City *"
              value={formData.city}
              onChange={handleChange}
              required
              className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              value={formData.state}
              onChange={handleChange}
              required
              className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="pinCode"
              placeholder="Zip Code *"
              value={formData.pinCode}
              onChange={handleChange}
              required
              className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-blue-500 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 text-sm sm:text-base rounded-lg transition-colors duration-300 mt-2"
          >
            Create Account
          </button>

          <p className="text-xs sm:text-sm text-black mt-3 sm:mt-4 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;