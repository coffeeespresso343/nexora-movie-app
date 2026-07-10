import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const ProfileMenu = ({ onClose, triggerRef }) => {
  const { user, logout, getAvatarUrl } = useAuth();
  const { info } = useToast();

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const avatarUrl = getAvatarUrl(user?.prefs?.avatarFileId, 64);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    onClose();
    info("See you again.", { title: "You have been signed out." });
    navigate("/");
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
    <div
      ref={menuRef}
      className="absolute -right-14 md:right-0  mt-3 w-64 rounded-lg border border-white/10 bg-black/90 py-1 shadow-lg backdrop-blur-md"
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
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
      </div>

      <div className="border-b border-white/10 py-2">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
          </svg>
          View Profile
        </Link>
        <Link
          to="/settings"
          onClick={onClose}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Settings
        </Link>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex w-full ml-1 items-center gap-2 px-4 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-60"
      >
        {isLoggingOut ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
        )}
        {isLoggingOut ? "Logging out..." : "Log Out"}
      </button>
    </div>
  );
};

export default ProfileMenu;
