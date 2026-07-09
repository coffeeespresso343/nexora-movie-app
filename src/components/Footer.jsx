import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movie" },
  { label: "Series", to: "/series" },
  { label: "Genres", to: "/genres" },
  { label: "New & Popular", to: "/new-and-popular" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/about" },
  { label: "Terms of Use", to: "/about" },
  { label: "Contact", to: "/about" },
  { label: "About", to: "/about" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/coffeeespresso343",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="mt-20 border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
                N
              </span>
              <span className="text-xl font-semibold tracking-wide">
                Nexora
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your ultimate streaming destination for movies and series.
              Discover what to watch next.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-purple-500/40 hover:text-purple-400"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Browse
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-sm text-gray-400 transition hover:text-purple-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-sm text-gray-400 transition hover:text-purple-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-xs text-gray-500">
                Movie and series data provided by{" "}
                <a
                  href="https://www.themoviedb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  TMDB
                </a>
                . This product uses the TMDB API but is not endorsed or
                certified by TMDB.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-2 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Nexora. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built with heart and too much coffee by{" "}
            <a
              href="https://github.com/coffeeespresso343"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition hover:text-purple-400"
            >
              Linn Khant
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
