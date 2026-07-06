import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  account,
  deleteAvatar,
  getAvatarUrl,
  OAuthProvider,
  uploadAvatar,
} from "../appwrite";
import { ID } from "appwrite";
import Spinner from "../components/Spinner";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isLoading: true,
  error: "",
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: "" };

    case "SUCCESS":
      return { ...state, user: action.payload, isLoading: false, error: "" };

    case "ERROR":
      return { ...state, isLoading: false, error: action.payload };

    case "LOGOUT":
      return { ...state, user: null, isLoading: false, error: "" };

    case "REFRESH_USER":
      return { ...state, user: action.payload, error: "" };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // On mount, check whether a session already exists.
  useEffect(() => {
    let ignore = false;

    const checkSession = async () => {
      try {
        const currentUser = await account.get();

        if (!ignore) {
          dispatch({ type: "SUCCESS", payload: currentUser });
        }
      } catch (error) {
        if (!ignore) {
          dispatch({ type: "LOGOUT" });
        }
      }
    };

    checkSession();

    return () => {
      ignore = true;
    };
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    dispatch({ type: "LOADING" });

    try {
      await account.create({ userId: ID.unique(), email, password, name });
      await account.createEmailPasswordSession({ email, password });

      const currentUser = await account.get();

      dispatch({ type: "SUCCESS", payload: currentUser });

      return { success: true };
    } catch (error) {
      const message = error?.message || "Could not create account.";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, error: message };
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    dispatch({ type: "LOADING" });

    try {
      await account.createEmailPasswordSession({ email, password });
      const currentUser = await account.get();
      dispatch({ type: "SUCCESS", payload: currentUser });

      return { success: true };
    } catch (error) {
      const message = error?.message || "Invalid email or password.";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, error: message };
    }
  }, []);

  const loginWithGoogle = useCallback(() => {
    const baseUrl = window.location.origin;

    account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: `${baseUrl}/auth/callback`,
      failure: `${baseUrl}/signin`,
    });

    // account.createOAuth2Session({
    //   provider: OAuthProvider.Google,
    //   success: `${baseUrl}/auth/callback`,
    //   failure: `${baseUrl}/signin`,
    // });
  }, []);

  const completeOAuthSession = useCallback(async (userId, secret) => {
    dispatch({ type: "LOADING" });

    try {
      await account.createSession({ userId, secret });
      const currentUser = await account.get();
      dispatch({ type: "SUCCESS", payload: currentUser });
      return { success: true };
    } catch (error) {
      const message = error?.message || "Google sign-in failed.";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, error: message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: "current" });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const updateProfileName = useCallback(async (name) => {
    try {
      const updateUser = await account.updateName({ name });
      dispatch({ type: "REFRESH_USER", payload: updateUser });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Could not update name.",
      };
    }
  }, []);

  const updateUserEmail = useCallback(async (email, currentPassword) => {
    try {
      const updatedUser = await account.updateEmail({
        email,
        password: currentPassword,
      });

      dispatch({ type: "REFRESH_USER", payload: updatedUser });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Could not update email.",
      };
    }
  }, []);

  const updateUserPassword = useCallback(
    async (newPassword, currentPassword) => {
      try {
        await account.updatePassword({
          password: newPassword,
          oldPassword: currentPassword || undefined,
        });

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error?.message || "Could not update password.",
        };
      }
    },
    [],
  );

  const updateAvatar = useCallback(async (file) => {
    try {
      const currentUser = await account.get();

      const previousFileId = currentUser.prefs?.avatarFileId;

      const newFileId = await uploadAvatar(file, currentUser.$id);

      const updateUser = await account.updatePrefs({
        prefs: { ...currentUser.prefs, avatarFileId: newFileId },
      });

      if (previousFileId) {
        deleteAvatar(previousFileId).catch((err) => console.error(err));
      }

      dispatch({ type: "REFRESH_USER", payload: updateUser });

      return { success: true, avatarUrl: getAvatarUrl(newFileId) };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Could not upload avatar.",
      };
    }
  }, []);

  const removeAvatar = useCallback(async () => {
    try {
      const currentUser = await account.get();
      const fileId = currentUser.prefs?.avatarFileId;

      const updatedUser = await account.updatePrefs({
        prefs: { ...currentUser.prefs, avatarFileId: null },
      });

      if (fileId) {
        deleteAvatar(fileId).catch((err) => console.error(err));
      }

      dispatch({ type: "REFRESH_USER", payload: updatedUser });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Failed to remove avatar.",
      };
    }
  }, []);

  // Soft-delete: blocks the account from logging in again.
  // No erase the underlying user data
  const deactivateAccount = useCallback(async (password) => {
    try {
      await account.updatePassword({
        password,
        oldPassword: password,
      });

      await account.updateStatus();

      try {
        await account.deleteSession({
          sessionId: "current",
        });
      } catch {}

      dispatch({ type: "LOGOUT" });
      return { success: true };
    } catch (error) {
      const message =
        error?.message || "Acccount deactivation failed. Try again later.";
      const isWrongPassword =
        message.toLowerCase().includes("invalid") ||
        message.toLowerCase().includes("password") ||
        message.toLowerCase().includes("credentails");

      return {
        success: false,
        error: isWrongPassword
          ? "Incorrect password. Please try again."
          : message,
      };
    }
  });

  const value = {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: Boolean(state.user),
    signup,
    login,
    loginWithGoogle,
    completeOAuthSession,
    logout,
    updateProfileName,
    updateUserEmail,
    updateUserPassword,
    updateAvatar,
    removeAvatar,
    deactivateAccount,
    getAvatarUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
