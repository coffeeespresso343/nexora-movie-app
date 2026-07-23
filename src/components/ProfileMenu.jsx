import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { Loader2, LogOut, Settings, UserCircle } from "lucide-react";

const ProfileMenu = ({ onClose, triggerRef }) => {
  const { user, logout, getAvatarUrl } = useAuth();
  const { info } = useToast();

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const avatarUrl = getAvatarUrl(user?.prefs?.avatarFileId, 64);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    onClose();
    info("See you again.", { title: "You have been signed out." });
    navigate("/");
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (triggerRef?.current?.contains(e.target)) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{
          type: "tween",
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute -right-14 md:right-0  mt-3 w-64 rounded-lg border border-white/10 bg-black/90 py-1 shadow-lg backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, x: "100%", scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center gap-3 border-b border-white/10 px-4 py-3"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-sm font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() ||
                user?.email?.charAt(0)?.toUpperCase() ||
                "?"}
            </div>
          )}
          <div className="min-w-0 flex-1 truncate text-gray-400">
            <h3 className="truncate font-medium text-white">{user?.name}</h3>
            <p className="truncate text-sm">{user?.email}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "100%", scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-b border-white/10 py-2"
        >
          <Link
            to="/profile"
            onClick={onClose}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            <UserCircle size={20} />
            View Profile
          </Link>
          <Link
            to="/settings"
            onClick={onClose}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            <Settings size={20} />
            Settings
          </Link>
        </motion.div>

        {!showLogoutConfirm ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setShowLogoutConfirm(true)}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-400  hover:bg-red-500/10 hover:text-red-300 "
          >
            <LogOut size={20} /> Logout
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-3 pb-5 bg-red-500/5 rounded-lg border border-red-500/30 flex items-center justify-center flex-col p-2"
          >
            <p className="text-red-500 text-sm">Are you sure to Logout?</p>

            <motion.div className="mt-3 flex gap-2">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-full flex items-center gap-1 bg-red-500 px-4 py-1 text-sm  text-white hover:bg-red-600 disabled:opacity-60 cursor-pointer"
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
                onClick={() => setShowLogoutConfirm(false)}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300  hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileMenu;
