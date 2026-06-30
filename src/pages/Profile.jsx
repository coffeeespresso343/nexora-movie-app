import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const {
    user,
    getAvatarUrl,
    updateProfileName,
    updateUserEmail,
    updateAvatar,
    removeAvatar,
    deActiveAccount,
  } = useAuth();

  const fileInputRef = useRef(null);
  const avatarUrl = getAvatarUrl(user?.prefs?.avatarFileId, 160);

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [deactiveError, setDeactivateError] = useState("");

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please choose an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Image size must be smaller than 5MB.");
      return;
    }

    setAvatarError("");

    setIsUploadingAvatar(true);

    const result = await updateAvatar(file);
    setIsUploadingAvatar(false);

    if (!result.success) {
      setAvatarError(result.error);
    }

    e.target.value = ""; // allow re-selecting the same file later
  };

  const handleRemoveAvatar = async () => {
    setAvatarError("");
    setIsUploadingAvatar(true);
    const result = await removeAvatar();
    setIsUploadingAvatar(false);

    if (!result.success) {
      setAvatarError(result.error);
    }
  };

  const handleDeactive = async () => {};

  return (
    <div className="min-h-screen bg-black px-6 pb-20 pt-28 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-bold text-3xl">
          Your{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>

        <section className="mt-10 flex items-center gap-6">
          <div className="relative h-24 w-24 shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-24 w-24 rounded-full object-cover"
                onLoad={() => console.log("Image loaded")}
                onError={(e) => {
                  console.log("Failed to load image");
                  console.log(e.currentTarget.src);
                }}
              />
            ) : (
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full 
              bg-linear-to-r from-purple-500 to-pink-500 text-3xl font-bold text-white"
              >
                {user?.name.charAt(0)?.toUpperCase() ||
                  user?.email.charAt(0)?.toUpperCase() ||
                  "?"}
              </div>
            )}
            {/* To Do */}

            {isUploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
                <span className="text-xs text-gray-300">...</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-50"
              >
                Change photo
              </button>
              {user?.prefs?.avatarFileId && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={isUploadingAvatar}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <p className="mt-1 text-xs text-gray-500">
              JPG, PNG, or GIF. Max 5MB
            </p>
            {avatarError && (
              <p className="mt-1 text-xs text-red-400">{avatarError}</p>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="border-b pb-2 border-white/15">
            <h2 className="text-lg font-semibold">Username</h2>
            <p className=" mt-1 text-gray-400">{user?.name}</p>
          </div>
          <div className="border-b pb-2 pt-2 border-white/15">
            <h2 className="text-lg font-semibold">Email</h2>
            <p className=" mt-1 text-gray-400">{user?.email}</p>
          </div>
          <div className="border-b pb-2 pt-2 border-white/15">
            <h2 className="text-lg font-semibold">Password</h2>
            <p className=" mt-1 text-gray-400">••••••••</p>
          </div>
          <p className="mt-6 text-xs text-gray-500">
            Want to change your username, email or password?{" "}
            <Link to="/settings" className="underline hover:text-gray-300">
              Go to Account Settings
            </Link>
          </p>
        </section>

        <section className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
          <p className="mt-2 text-sm text-gray-400">
            Deactivating your account immediately signs you out and blocks
            future logins. Your data is not erased yet - full deletion is
            handled separately.
          </p>

          {!showDeactivateConfirm ? (
            <button
              type="button"
              onClick={() => setShowDeactivateConfirm(true)}
              className="mt-4 rounded-full border border-red-500/40 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              Deactivate Account
            </button>
          ) : (
            <div className="mt-4 space-y-3">
              <p>
                Are you sure? This will sign you out and block your account
                immediately.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDeactive}
                  disabled={isDeactivating}
                  className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                  {isDeactivating ? "Deactivating..." : "Yes, deactivate"}
                </button>
                <button
                  onClick={() => setShowDeactivateConfirm(false)}
                  type="button"
                  disabled={isDeactivating}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
              {deactiveError && (
                <p className="text-sm text-red-400">{deactiveError}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
