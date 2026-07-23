import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileMenu from "./ProfileMenu";
import { getAvatarUrl } from "../appwrite";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, LogIn, LogOut, Menu, X } from "lucide-react";
import { useToast } from "../context/ToastContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/movie", label: "Movie" },
  { to: "/series", label: "Series" },
  { to: "/genres", label: "Genres" },
  { to: "/new-and-popular", label: "New & Popular" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const { info } = useToast();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const buttonRef = useRef();

  const avatar = getAvatarUrl(user?.prefs?.avatarFileId, 160);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();

      setIsMenuOpen(false);
      setIsUserMenuOpen(false);

      info("See you again.", { title: "You have been signed out." });

      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const handleSearch = () => {
    setIsUserMenuOpen(false);
    if (!isAuthenticated) navigate("/signin");

    const path = location.pathname;
    let targetPage = path.startsWith("/movie")
      ? "/movie"
      : path.startsWith("/series")
        ? "/series"
        : "/new-and-popular";

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
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
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
                // const isActive = location.pathname === to;

                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-400"
                          : "text-gray-300 hover:text-purple-400"
                      }
                    >
                      {label}
                    </NavLink>
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
                  <ProfileMenu
                    onClose={() => setIsUserMenuOpen(false)}
                    triggerRef={buttonRef}
                  />
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
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => {
                setIsMenuOpen((open) => !open);
                setShowLogoutConfirm(false);
              }}
              className="text-white md:hidden cursor-pointer hover:text-purple-400"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMenuOpen ? "close" : "opan"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-16 z-40 bg-purple-500/5 backdrop-blur-md lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-[72%] max-w-sm rounded-bl-3xl flex-col border-l border-b border-white/10 text-sm font-medium bg-purple-500/10 p-4 shadow-2xl backdrop-blur-xl"
            >
              {NAV_LINKS.map(({ to, label }, i) => {
                return (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ delay: 0.06 * i, duration: 0.4 }}
                  >
                    <NavLink
                      to={to}
                      end={to === "/"}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-xl mb-1 px-5 py-3 font-medium  ${
                          isActive
                            ? "bg-purple-500/15 text-purple-400"
                            : "text-gray-300  hover:text-purple-400"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                );
              })}
              <hr className="text-pink-500/20 mt-8" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-4"
              >
                {isAuthenticated ? (
                  <AnimatePresence mode="wait">
                    {!showLogoutConfirm ? (
                      <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setShowLogoutConfirm(true)}
                        className="flex gap-1.5 items-center justify-center w-full bg-red-500/10 text-red-500 px-4 py-2 rounded-full border shadow-lg shadow-red-500/10 border-red-500/30"
                      >
                        <LogOut size={16} /> Logout
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98, y: -20 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="space-y-3 flex flex-col items-center justify-center overflow-hidden border bg-red-500/5 border-red-500/20 rounded-lg p-4"
                      >
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-sm text-red-500"
                        >
                          Are you sure to logout?
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="mt-2 flex items-center gap-3"
                        >
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-full flex items-center gap-1.5 bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60 cursor-pointer"
                          >
                            {isLoggingOut ? (
                              <>
                                <Loader2 size={16} className="animate-spin" />
                                Logging out...
                              </>
                            ) : (
                              "Yes, Logout"
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelLogout}
                            className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : (
                  <Link
                    to="/signin"
                    className="flex gap-1.5 items-center justify-center w-full bg-linear-to-r from-purple-500 to-pink-400 text-white px-4 py-2 rounded-full border shadow-lg shadow-purple-500/10 border-purple-500/30"
                  >
                    <LogIn size={16} /> Sigin In
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
