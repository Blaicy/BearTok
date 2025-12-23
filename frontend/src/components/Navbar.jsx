import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          BearTok
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 text-white">
          <Link to="/" className="btn btn-ghost text-lg hover:bg-red-400">Home</Link>
          <Link to="/shopKit" className="btn btn-ghost text-lg hover:bg-red-400">Shop Kits</Link>
          <Link to="/bookParty" className="btn btn-ghost text-lg hover:bg-red-400">Events</Link>
          <Link to="/orders" className="btn btn-ghost text-lg hover:bg-red-400">My Orders</Link>
          <Link to="/contact" className="btn btn-ghost text-lg hover:bg-red-400">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 text-white">
          <Link onClick={() => setMenuOpen(false)} to="/" className="btn btn-ghost hover:bg-red-400">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/shopKit" className="btn btn-ghost hover:bg-red-400">Shop Kits</Link>
          <Link onClick={() => setMenuOpen(false)} to="/bookParty" className="btn btn-ghost hover:bg-red-400">Events</Link>
          <Link onClick={() => setMenuOpen(false)} to="/orders" className="btn btn-ghost hover:bg-red-400">My Orders</Link>
          <Link onClick={() => setMenuOpen(false)} to="/profile" className="btn btn-ghost hover:bg-red-400">Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
