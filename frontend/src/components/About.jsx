import React from 'react';

const About = () => {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${base}images/Bg2.jpg)` }}>
        </div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-16 sm:px-8 sm:py-24 bg-black/60 rounded-3xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          About BearTok
        </h1>

        <p className="text-white text-base sm:text-lg md:text-xl mb-4">
          Beartok is where creativity, comfort, and a little bit of magic come together.
        </p>
        <p className="text-white text-base sm:text-lg md:text-xl mb-4">
          Whether it’s a gift, a keepsake, or a small moment of joy, Beartok is about creating pieces that feel special from the very first look.
        </p>
        <p className="text-white text-base sm:text-lg md:text-xl mb-4">
          Our products are designed with intention—soft, thoughtful, and made to spark emotion. We care about the little details.
        </p>

        <div className="mb-6">
          <p className="text-white font-semibold mb-2">We're big on:</p>
          <ul className="flex justify-center text-white gap-5">
            <li>• Thoughtful design</li>
            <li>• Quality that lasts</li>
            <li>• Creativity without limits</li>
          </ul>
        </div>

        <p className="text-white/65 text-base sm:text-lg md:text-xl">
          Beartok isn’t just a brand — it’s a feeling.
        </p>
      </div>
    </div>
  );
};

export default About;
