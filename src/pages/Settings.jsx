import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Settings = () => {
  const { user, updateProfileName, updateUserEmail, updateUserPassword } =
    useAuth();

  const { success, error } = useToast();

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

  const [showNewPassword, setShowNewPassword] = useState(false);

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
      success(`Username updated to "${name}"`);
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
      success(`Email updated to "${email}"`);
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
      success("Password changed.");
    } else {
      setPasswordError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 pb-20 pt-28 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl text-center font-bold">
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
                placeholder="Enter current password"
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-purple-500/60"
              />
            </div>
            <div className="relative">
              <label htmlFor="new-password" className="text-sm text-gray-300">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="new-password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 pr-11 text-white outline-none focus:border-purple-500/60"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((v) => !v)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 translate-y-1/3 text-gray-400 transition hover:text-white"
              >
                {showNewPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                    <path d="m2 2 20 20" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
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
