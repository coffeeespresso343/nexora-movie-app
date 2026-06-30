import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ onClose }) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
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
      className="absolute right-0 mt-3 w-44 rounded-lg border border-white/10 bg-black/90 py-1 shadow-lg backdrop-blur-xd"
    >
      <div className="truncate border-b border-white/10 px-4 py-2  text-gray-400">
        <h3 className="font-medium text-white">{user?.name}</h3>
        <p className="text-sm">{user?.email}</p>
      </div>

      <div className="py-2 border-b border-white/10">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex w-full items-center gap-3 p-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
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
            className="lucide lucide-circle-user-icon lucide-circle-user"
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
            className="lucide lucide-settings-icon lucide-settings"
          >
            <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Setting
        </Link>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center justify-baseline gap-2 w-full px-4 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
      >
        Log Out
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
      </button>
    </div>
  );
};

export default Profile;
