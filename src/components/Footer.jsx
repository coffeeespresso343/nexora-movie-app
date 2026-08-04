import { Compass } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { siFacebook, siGithub, siInstagram, siTelegram } from "simple-icons";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movie" },
  { label: "Series", to: "/series" },
  { label: "Genres", to: "/genres" },
  { label: "New & Popular", to: "/new-and-popular" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/not-found" },
  { label: "Terms of Use", to: "/not-found" },
  { label: "Contact", to: "/not-found" },
  { label: "About", to: "/about" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    value: "@linnkhant404",
    href: "https://www.facebook.com/linnkhant404",
    icon: siFacebook,
  },
  {
    label: "Instagram",
    value: "@lynnmrattswe",
    href: "https://www.instagram.com/lynnmrattswe",
    icon: siInstagram,
  },
  {
    label: "Telegram",
    value: "@linnkhant343",
    href: "https://t.me/linnkhant343",
    icon: siTelegram,
  },
  {
    label: "GitHub",
    value: "@coffeeespresso343",
    href: "https://github.com/coffeeespresso343",
    icon: siGithub,
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
            <div className="border border-white/10 bg-white/5 rounded-xl flex flex-col items-center gap-3 p-3">
              <h2 className="text-sm leading-relaxed text-gray-400">
                Developed by Linn Khant
              </h2>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://linnkhant.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="bg-white/10 h-8 w-8 flex items-center justify-center rounded-xl">
                    <Compass className="text-gray-400 h-6 w-6 hover:text-white" />
                  </span>
                </a>
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="bg-white/10 h-8 w-8 flex items-center justify-center rounded-xl">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-gray-400 transition-colors duration-200 hover:text-white"
                      >
                        <path d={link.icon.path} />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
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
