import React, { useState } from "react";

const BookParty = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted!");
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen px-4 py-12 sm:px-6">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/Bg2.jpg)` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="px-2 mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Event Booking
          </h1>
          <p className="text-sm sm:text-base text-white/80 ">
            Join our fun event!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-6 text-white border shadow-2xl bg-black/70 backdrop-blur-lg border-white/20 sm:p-8 rounded-2xl"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-white/90 sm:text-base">
              Your Name
            </label>
            <input
              type="text"
              className="w-full p-3 mt-2 border rounded-lg outline-none bg-white/20 placeholder-white/50 border-white/20 focus:border-purple-300"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-white/90 sm:text-base">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 mt-2 border rounded-lg outline-none bg-white/20 placeholder-white/50 border-white/20 focus:border-purple-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="
              bg-[#e9d7ff] text-[#3c1a5b]
              py-3 rounded-full font-semibold shadow-xl
              hover:scale-105 active:scale-95 transition-all
            "
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookParty;
