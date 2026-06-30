import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import ProfileMenu from "./ProfileMenu";
import { getAvatarUrl } from "../appwrite";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/movie", label: "Movie" },
  { to: "/series", label: "Series" },
  { to: "/genres", label: "Genres" },
  { to: "/new-and-popular", label: "New & Popular" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const buttonRef = useRef();

  const { user, isAuthenticated, logout } = useAuth();
  const avatar = getAvatarUrl(user?.prefs?.avatarFileId, 160);

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const handleSearch = () => {
    setIsUserMenuOpen(false);
    if (!isAuthenticated) navigate("/signin");

    const path = location.pathname;
    let targetPage = path.startsWith("/series") ? "/series" : "/movie";

    navigate(targetPage, {
      state: {
        focusSearch: true,
      },
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
            onClick={handleSearch}
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

          {isAuthenticated ? (
            <div className="relative">
              <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsUserMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
                aria-label="Open profile menu"
                className="flex h-8 w-8 items-center rounded-full border-b border-white/10 object-cover"
              >
                <img
                  src={
                    avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name.charAt(0) || "User",
                    )}&background=cd22f0&color=fff`
                  }
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="absolute top-0.5 right-0 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full border border-neutral-900 bg-green-500"></span>
                </span>
              </button>
              {isUserMenuOpen && (
                <ProfileMenu onClose={() => setIsUserMenuOpen(false)} />
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="hidden rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10 sm:block"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-4 py-2 font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110"
              >
                Get Started
              </Link>
            </>
          )}

          <button
            type="button"
            aria-label="Toogle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="text-white md:hidden cursor-pointer hover:text-purple-400"
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
