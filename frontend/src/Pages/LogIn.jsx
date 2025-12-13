import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../config"; // Make sure config.js exports API_URL

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/logIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate(from, { replace: true });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/Bg2.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-sm sm:text-base text-white/80 mb-6">
          Log in to BearTok
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-white/90 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="youremail@example.com"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/50 border border-white/20 focus:border-purple-300 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-white/90 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/50 border border-white/20 focus:border-purple-300 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#e9d7ff] text-[#3c1a5b] font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Log In
          </button>

          <p className="text-center text-white/70 text-sm mt-2">
            Don’t have an account?
            <Link to="/signUp" className="text-[#e9d7ff] ml-1 font-medium">
              Sign Up
            </Link>
          </p>
        </form>

        <div className="mt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} BearTok. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default LogIn;
