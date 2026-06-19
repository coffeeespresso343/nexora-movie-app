import React from "react";

const Hero = () => {
  return (
    <section className="relative pl-5 mt-10 h-screen w-full text-white overflow-hidden">
      <img
        src="hero.png"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl space-y-6 ">
          <h1 className="flex flex-col items-start">
            <span>Entertain.</span>
            <span>Explore.</span>
            <span className="bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Experience Nexora.
            </span>
          </h1>
          <p>
            Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button className="flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full font-semibold shadow-lg shadow-purple-500/30 hover:scale-105 transition">
              ▶ Start Watching
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
              Explore More
            </button>
          </div>

          <div className="flex gap-8 pt-10 text-sm text-gray-300">
            <div className="felx items-center gap-2">
              <span>🎦</span> Unlimited Entertainment
            </div>
            <div className="felx items-center gap-2">
              <span>⚡</span> New Contents Every Week
            </div>
            <div className="felx items-center gap-2">
              <span>🔐</span> Secure Streaming
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
