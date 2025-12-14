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

      <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-12 font-serif text-3xl font-extrabold text-center sm:text-4xl md:text-5xl text-black/80">
          Shop for Kits!
        </h2>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">
          
          {/* Left side: main image */}
          <div className="w-full sm:w-1/2">
            <img
              src={`${base}images/Item1.jpg`}
              alt="Creativity Kit"
              className="object-cover w-full h-64 border shadow-lg sm:h-80 rounded-2xl border-white/20"
            />
          </div>

          {/* Right side: text + button + smaller image with note */}
          <div className="flex flex-col items-center w-full mt-6 text-center sm:items-start sm:text-left sm:w-1/2 sm:mt-0">
            <p className="mb-6 font-mono text-base text-black sm:text-lg md:text-xl">
              Unlock the fun — grab your Creativity Kit now!
            </p>
            <button
              className="px-6 py-3 mb-6 font-semibold text-black transition-all border-2 border-black rounded-full shadow-lg bg-amber-500 hover:bg-white hover:text-black hover:scale-105 active:scale-95"
              onClick={() => navigate("/shopKit")}
            >
              Shop Now
            </button>

            {/* Smaller image with note */}
            <div className="flex items-center gap-4">
              <img
                src={`${base}images/Item3.jpg`}
                alt="Small Kit"
                className="border shadow-md w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border-white/20"
              />
              <span className="font-mono sm:text-base text-black/80">
                T-shirts available too
              </span>
            </div>
          </div>
        </div>
      </div>
        </section>

      {/* Event Section */}
      <section className="px-4 text-center bg-white sm:px-6 py-14">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="font-serif text-3xl font-extrabold text-black sm:text-4xl md:text-5xl">
            Event Schedule
          </h1>
          {/* <h3 className="text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            (20th–25th Feb)
          </h3>
          <p className="text-base font-bold text-black sm:text-lg">
            At Quails Spring Mall
          </p> */}
          <button
            className="px-6 py-3 mt-4 font-semibold text-black transition-all border-2 border-black rounded-full shadow-lg bg-amber-500 hover:bg-black hover:text-white hover:scale-105 active:scale-95"
            onClick={() => navigate("/bookParty")}
          >
            Book Your Slot
          </button>
        </div>
      </section>

      {/* What's Included */}
      <section
        className="relative w-full min-h-screen bg-center bg-cover"
        style={{
          backgroundImage: `url(${base}images/Bg1.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center max-w-5xl gap-10 mx-auto">
            <div className="w-full p-6 border shadow-xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20 sm:p-8">
              <h2 className="mb-6 text-2xl font-bold text-center text-purple-200 sm:text-3xl md:text-4xl">
                What's Included
              </h2>
              <ul className="space-y-4 text-base text-white/90 sm:text-lg md:text-xl">
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-amber-500">•</span>
                  Fluid Bear Bottles with 4 Different Color paints
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-amber-500">•</span>
                  Gloves
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-amber-500">•</span>
                  Art Lab Coat
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-amber-500">•</span>
                  2 Paint Brushes
                </li>
              </ul>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <img
                src={`${base}images/Item1.jpg`}
                alt="Kit Item"
                className="object-cover w-full h-64 border shadow-2xl sm:h-72 rounded-2xl border-white/20"
              />
              <img
  
                src={`${base}images/Item3.jpg`}
                alt="Kit Item"
                className="object-cover w-full h-64 border shadow-2xl sm:h-72 rounded-2xl border-white/20"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
