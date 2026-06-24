import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { account } from "../appwrite";
import { ID, OAuthProvider } from "appwrite";

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
