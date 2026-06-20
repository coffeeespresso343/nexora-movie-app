import React from "react";

const Hero = () => {
  return (
    <section className="relative pl-4 mt-10 h-screen w-full text-white overflow-hidden">
      <img
        src="hero.png"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />
      {/* <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl space-y-6 ">
          <h1 className="flex flex-col items-start">
            <span>Entertain</span>
            <span>Explore</span>
            <span className="bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Experience Nexora
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-lg">
            Unlimited movies, TV shows, and more. <br /> Watch anywhere. Cancel
            anytime
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button className="flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full font-semibold shadow-lg shadow-purple-500/30 hover:scale-105 transition">
              ▶ Start Watching
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 hover:scale-105 transition">
              Explore More
            </button>
          </div>

          <div className="flex gap-8 pt-10 text-sm text-gray-300">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="purple"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
                <path d="M7 21h10" />
                <rect width="20" height="14" x="2" y="3" rx="2" />
              </svg>
              <span>Unlimited Entertainment</span>
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="purple"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
              <span>New Contents Every Week</span>
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="purple"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="">Safe & Secure Streaming</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
