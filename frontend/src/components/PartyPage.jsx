import React from "react";
import { useNavigate } from "react-router-dom";

const PartyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/Bg6.jpg)" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center text-center max-w-2xl w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-black font-serif">
            Event Schedule
          </h2>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black font-serif mt-2">
            (20th–25th Feb)
          </h3>

          <p className="text-black text-lg sm:text-xl md:text-2xl mt-5 font-bold">
            Venue: Quails Spring Mall
          </p>

          <p className="text-black text-base sm:text-lg font-mono mt-3 mb-6 max-w-xl">
            Unleash your creativity with our all-inclusive BearTok parties.
          </p>

          <button
            onClick={() => navigate("/party")}
            className="
              bg-amber-500 text-black rounded-md font-semibold shadow-xl
              px-6 py-3 border-2
              hover:bg-blue-500 hover:scale-105
              active:scale-95 transition-all
            "
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartyPage;
