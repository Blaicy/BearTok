import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config"; // Make sure this exists

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/orders";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await axios.post(`${API_URL}/signUp`, {
        name,
        email,
        password,
      });

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/Bg2.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5">
        <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">Create Account</h1>
        <p className="text-center text-white/80 text-sm sm:text-base mb-4">Join BearTok today</p>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="font-semibold text-white/90 mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Blaicy Mokaya"
              className="w-full mt-1 p-3 rounded-lg bg-white/20 placeholder-white/50 border border-white/20 focus:border-purple-300 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-white/90 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="youremail@example.com"
              className="w-full mt-1 p-3 rounded-lg bg-white/20 placeholder-white/50 border border-white/20 focus:border-purple-300 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-white/90 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full mt-1 p-3 rounded-lg bg-white/20 placeholder-white/50 border border-white/20 focus:border-purple-300 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#e9d7ff] text-[#3c1a5b] font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Sign Up
          </button>

          <p className="text-center text-white/70 text-sm mt-3">
            Already have an account?
            <Link to="/logIn" className="text-[#e9d7ff] ml-1 font-medium">
              Log In
            </Link>
          </p>
        </form>

        <div className="mt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} BearTok. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default SignUp;
