import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden">
      {/* Shop Section */}
      <section
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: "url(/images/Bg1.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black/80 font-serif mb-8 text-center">
            Shop for Kits!
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            <img
              src="/images/Item1.jpg"
              alt="Creativity Kit"
              className="w-full h-56 sm:h-64 object-cover rounded-2xl border border-white/20 shadow-md"
            />

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="text-black text-base sm:text-lg md:text-xl mb-4 font-mono">
                Unlock the fun — grab your Creativity Kit now!
              </p>
              <button
                className="bg-amber-500 border-2 border-black text-black rounded-full
                  font-semibold shadow-lg px-6 py-3
                  hover:bg-white hover:text-black hover:scale-105
                  active:scale-95 transition-all"
                onClick={() => navigate('/shopKit')}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section className="bg-white px-4 sm:px-6 py-10 sm:py-14 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black font-serif">
            Event Schedule
          </h1>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            (20th–25th Feb)
          </h3>
          <p className="text-black text-base sm:text-lg font-bold">
            At Quails Spring Mall
          </p>
          <button
            className="mt-4 bg-amber-500 border-2 border-black text-black rounded-full
              font-semibold shadow-lg px-6 py-3
              hover:bg-black hover:text-white hover:scale-105
              active:scale-95 transition-all"
            onClick={() => navigate('/party')}
          >
            Book Your Slot
          </button>
        </div>
      </section>

      {/* What's Included */}
      <section
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: "url(/images/Bg1.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
            <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-200 mb-6 text-center">
                What's Included
              </h2>
              <ul className="space-y-4 text-white/90 text-base sm:text-lg md:text-xl">
                <li className="flex items-center gap-3">
                  <span className="text-amber-500 text-2xl">•</span> Custom BearTok T-Shirts
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-amber-500 text-2xl">•</span> Fluid Bears for Each Guest
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-amber-500 text-2xl">•</span> Paint Buckets, Gloves, Coats & Trays
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-amber-500 text-2xl">•</span> Fun challenges & activities
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/images/Item1.jpg"
                alt="Kit Item"
                className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-2xl border border-white/20"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/images/Item3.jpg"
                alt="Kit Item"
                className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-2xl border border-white/20"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
