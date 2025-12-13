import React, { useState } from "react";

const BookParty = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted!");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/Bg2.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6 px-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Event Booking
          </h1>
          <p className="text-sm sm:text-base text-white/80">
            Join our fun event from 20th–25th Feb at Quails Spring Mall.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            bg-black/70 backdrop-blur-lg
            border border-white/20
            p-6 sm:p-8
            rounded-2xl shadow-2xl
            text-white
            flex flex-col gap-5
          "
        >
          {/* Name */}
          <div>
            <label className="font-semibold text-white/90 text-sm sm:text-base">
              Your Name
            </label>
            <input
              type="text"
              className="
                w-full mt-2 p-3 rounded-lg
                bg-white/20 placeholder-white/50
                border border-white/20
                focus:border-purple-300 outline-none
              "
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-white/90 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              className="
                w-full mt-2 p-3 rounded-lg
                bg-white/20 placeholder-white/50
                border border-white/20
                focus:border-purple-300 outline-none
              "
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
