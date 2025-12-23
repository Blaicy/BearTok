import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const base = import.meta.env.BASE_URL;

  return (
    <div className="relative w-full overflow-hidden">

      {/* Shop Section */}
      <section
        className="relative w-full min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${base}images/Bg1.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl">
          <h2 className="mb-12 font-serif text-3xl font-extrabold text-center text-black/80">
            Shop for Kits!
          </h2>

          <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
            <div className="w-full sm:w-1/2">
              <img
                src={`${base}images/Item1.jpg`}
                alt="Creativity Kit"
                className="object-cover w-full h-64 border shadow-lg sm:h-80 rounded-2xl border-white/20"
              />
            </div>

            <div className="flex flex-col items-center w-full text-center sm:items-start sm:text-left sm:w-1/2">
              <p className="mb-6 font-mono text-base text-black sm:text-lg">
                Unlock the fun — grab your Creativity Kit now!
              </p>

              <button
                type="button"
                className="px-6 py-3 font-semibold text-black transition-all border-2 border-black rounded-full shadow-lg bg-amber-500 hover:bg-white hover:scale-105 active:scale-95"
                onClick={() => navigate("/shopKit")}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section className="px-4 py-14 text-center bg-white">
        <h1 className="font-serif text-3xl font-extrabold text-black">
          Event Schedule
        </h1>

        <button
          type="button"
          className="px-6 py-3 mt-6 font-semibold text-black transition-all border-2 border-black rounded-full shadow-lg bg-amber-500 hover:bg-black hover:text-white hover:scale-105 active:scale-95"
          onClick={() => navigate("/bookParty")}
        >
          Book Your Slot
        </button>
      </section>

      {/* Info Section */}
      <section
        className="relative w-full min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${base}images/Bg1.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl">
          <div className="max-w-5xl mx-auto space-y-10">

            <div className="p-6 border shadow-xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
              <h2 className="mb-6 text-2xl font-bold text-center text-purple-200">
                What's Included
              </h2>

              <ul className="space-y-4 text-white/90">
                <li>• Fluid Bear Bottles with 4 Different Color Paints</li>
                <li>• Gloves</li>
                <li>• Art Lab Coat</li>
                <li>• 2 Paint Brushes</li>
              </ul>
            </div>

            <div className="flex justify-center gap-6">
              <img
                src={`${base}images/Item1.jpg`}
                alt="Kit Item"
                className="object-cover w-full h-64 border shadow-2xl rounded-2xl border-white/20"
              />
              <img
                src={`${base}images/Item3.jpg`}
                alt="Kit Item"
                className="object-cover w-full h-64 border shadow-2xl rounded-2xl border-white/20"
              />
            </div>

            <div className="flex justify-center gap-10 mt-10">
              <button
                type="button"
                className="px-6 py-3 mt-6 font-semibold text-black transition-all border-2 border-black
                 rounded-lg shadow-lg bg-amber-500 hover:bg-black hover:text-white hover:scale-105 active:scale-95"
                onClick={() => navigate("/about")}
              >
                About Us
              </button>

              <button
                type="button"
                className="px-6 py-3 mt-6 font-semibold text-black transition-all border-2 border-black
                 rounded-lg shadow-lg bg-amber-500 hover:bg-black hover:text-white hover:scale-105 active:scale-95"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
