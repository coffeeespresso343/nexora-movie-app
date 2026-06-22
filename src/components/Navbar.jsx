import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/movie", label: "Movie" },
  { to: "/series", label: "Series" },
  { to: "/genres", label: "Genres" },
  { to: "/new-and-popular", label: "New & Popular" },
];

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed mt-0 top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2"
        >
          <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
            N
          </span>
          <h3 className="text-xl font-semibold tracking-wide text-white">
            Nexora
          </h3>
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex gap-6 text-sm font-medium text-gray-300">
            {NAV_LINKS.map(({ to, label }) => {
              const isActive = location.pathname === to;

              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`transition ${isActive ? "text-purple-400" : "text-gray-300 hover:text-purple-400"}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="text-white transition hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10 sm:block"
          >
            Sign In
          </button>
          <button
            type="button"
            className="
          rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-4 py-2 font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110"
          >
            Get Started
          </button>

          <button
            type="button"
            aria-label="Toogle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="text-white md:hidden"
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-white/10 bg-black/60 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4 text-sm font-medium text-gray-300">
            {NAV_LINKS.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setIsMenuOpen(false);
                    }}
                    className={`block rounded-md px-2 py-2.5 transition ${
                      isActive
                        ? "bg-white/5 text-purple-400"
                        : "hover:bg-white/5 hover:text-purple-400"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
