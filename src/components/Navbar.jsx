import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 mt-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            N
          </span>
          <h3 className="text-white text-xl font-semibold tracking-wide">
            Nexora
          </h3>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex">
          <ul className="flex gap-6 text-sm font-medium text-gray-300">
            <li className="text-purple-500  cursor-pointer transition">Home</li>
            <li className="hover:text-purple-500 cursor-pointer transition">
              Movies
            </li>
            <li className="hover:text-purple-500 cursor-pointer transition">
              Series
            </li>
            <li className="hover:text-purple-500 cursor-pointer transition">
              Genres
            </li>
            <li className="hover:text-purple-500 cursor-pointer transition">
              New & Popular
            </li>
          </ul>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-white text-lg hover:scale-110 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition cursor-pointer"
          >
            Sign In
          </button>

          <button className="bg-linear-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full font-semibold shadow-lg shadow-purple-500/30 hover:text-blue-300 transition">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
