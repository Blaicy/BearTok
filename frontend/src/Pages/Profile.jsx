import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      setUser({ name: "", email: "" });
    }
  }
}, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/logIn");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/Bg2.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Profile Card */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">My Profile</h1>
        <p className="text-center text-white/70 text-sm sm:text-base mb-4">Manage your BearTok account</p>

        {/* User Info */}
        <div className="space-y-3">
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-white/70 text-xs sm:text-sm">Full Name</p>
            <p className="text-white text-base sm:text-lg font-semibold">{user.name}</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-white/70 text-xs sm:text-sm">Email</p>
            <p className="text-white text-base sm:text-lg font-semibold">{user.email}</p>
          </div>
        </div>

        {/* Buttons */}
        <Link
          to="/orders"
          className="block w-full mt-4 py-3 text-center rounded-full bg-purple-300 text-black font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          View My Orders
        </Link>
        <button
          onClick={handleLogout}
          className="w-full mt-3 py-3 rounded-full bg-red-400 text-white font-semibold shadow-lg hover:bg-red-500 transition-all"
        >
          Log Out
        </button>

        <p className="text-center text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} BearTok. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Profile;
