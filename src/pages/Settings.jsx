import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user, updateProfileName, updateUserEmail, updateUserPassword } =
    useAuth();

  const [name, setName] = useState(user?.name || "");
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState(user?.email || "");
  const [emailPassword, setEmailPassword] = useState("");
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNameSubmit = async (e) => {
    e.preventDefault();

    setNameMessage("");
    setNameError("");

    if (name.trim().toLowerCase() === user?.name.trim().toLowerCase()) {
      setNameError("Please enter a different username.");
      return;
    }
    if (!name.trim()) {
      setNameError("Username cannot be empty.");
      return;
    }

    setIsSavingName(true);
    const result = await updateProfileName(name.trim());
    setIsSavingName(false);

    if (result.success) {
      setNameMessage("Username updated successfully.");
    } else {
      setNameError(result.error);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    setEmailMessage("");
    setEmailError("");

    if (email.trim().toLowerCase() === user?.email.trim().toLowerCase()) {
      setEmailError("Please enter a different email address.");
      return;
    }

    if (!emailPassword) {
      setEmailError("Enter your current password to update email.");
      return;
    }

    setIsSavingEmail(true);
    const result = await updateUserEmail(email, emailPassword);

    setIsSavingEmail(false);

    if (result.success) {
      setEmailMessage("Email updated successfully.");
      setEmailPassword("");
    } else {
      setEmailError(result.error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }

    setIsSavingPassword(true);
    const result = await updateUserPassword(newPassword, currentPassword);

    setIsSavingPassword(false);

    if (result.success) {
      setPasswordMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setPasswordError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 pb-20 pt-28 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          Account{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Settings
          </span>
        </h1>

        {/* Username */}
        <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Username</h2>
          <form onSubmit={handleNameSubmit} className="mt-4 flex gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none transition focus:border-purple-500/60"
            />
            <button
              type="submit"
              disabled={isSavingName}
              className="rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110 disabled:opacity-60"
            >
              {isSavingName ? "Saving..." : "Save"}
            </button>
          </form>

          {nameMessage && (
            <p className="mt-2 text-sm text-green-400">{nameMessage}</p>
          )}
          {nameError && (
            <p className="mt-2 text-sm text-red-400">{nameError}</p>
          )}
        </section>

        {/* Email */}
        <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Email Address</h2>
          <p className="mt-1 text-sm text-gray-500">
            Changing your email requires your current password.
          </p>

          <form onSubmit={handleEmailSubmit} className="mt-4 space-y-3">
            <div>
              <label htmlFor="new-email" className="text-sm text-gray-300">
                New Email
              </label>
              <input
                type="email"
                id="new-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none transition focus:border-purple-500/60"
              />
            </div>
            <div>
              <label
                htmlFor="email-current-password"
                className="text-sm text-gray-300"
              >
                Current Password
              </label>
              <input
                type="password"
                id="email-current-password"
                required
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-purple-500/60"
              />
            </div>

            {emailMessage && (
              <p className="text-sm text-green-400">{emailMessage}</p>
            )}
            {emailError && <p className="text-sm text-red-400">{emailError}</p>}

            <button
              type="submit"
              disabled={isSavingEmail}
              className="rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-5 py-2.5 
              text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSavingEmail ? "Saving..." : "Update Email"}
            </button>
          </form>
        </section>

        {/* Password */}
        <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Password</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose a new password of at least 8 characters. If you signed up
            with Google and have never set a password, leave "current password"
            blank.
          </p>

          <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-3">
            <div>
              <label
                htmlFor="current-password"
                className="text-sm text-gray-300"
              >
                Current Password (leave blank if signed up with Google)
              </label>
              <input
                type="password"
                id="current-password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-purple-500/60"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="text-sm text-gray-300">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-purple-500/60"
              />
            </div>
            {passwordMessage && (
              <p className="text-sm text-green-400">{passwordMessage}</p>
            )}
            {passwordError && (
              <p className="text-sm text-red-400">{passwordError}</p>
            )}

            <button
              type="submit"
              disabled={isSavingPassword}
              className="rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-5 py-2.5 
              text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110 disabled:opacity-60"
            >
              {isSavingPassword ? "Saving..." : "Update Password"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Settings;
