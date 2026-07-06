import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, loginWithGoogle, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showGoogleNotice, setShowGoogleNotice] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/";
  const message = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    const result = await login({ email, password });

    if (result.success) {
      navigate(redirectTo);
    } else {
      setFormError(result.error);
    }
  };

  const handleGoogleLogin = () => {
    const timer = setTimeout(() => {
      setShowGoogleNotice(timer);
      return () => clearTimeout(timer);
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-black text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/8 p-8">
        <h1 className="text-2xl text-center font-bold text-white">
          Welcome{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Back
          </span>
        </h1>
        {message ? (
          <p className="mt-2 text-sm text-center text-amber-400 ">{message}</p>
        ) : (
          <p className="mt-2 text-sm text-center text-gray-400">
            Please sign in to continue watching.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-gray-300">
              Email*
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2 text-white outline-none transition focus:border-purple-500/60"
              placeholder="you@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-gray-300">
              Password*
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2 pr-11 text-white outline-none transition focus:border-purple-500/60"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Hide password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
              >
                {showPassword ? (
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
          </div>

          {formError && <p className="text-sm text-red-400">{formError}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-4 py-2.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs tracking-wider text-gray-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          title="coming soon..."
          onClick={handleGoogleLogin}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-medium transition hover:bg-white/10 "
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div
          className={`transition-all duration-600 ${showGoogleNotice ? "mt-4 mb-12 md:mb-8 max-h-30 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <div className="rounded-sm border bg-amber-400/5 border-amber-400/10 p-2">
            <div className="mt-2 flex flex-col items-center gap-1  text-center text-xs text-amber-400 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              <h2 className="text-sm font-semibold text-amber-400">
                Sorry for the inconvenience
              </h2>
              <p>Continue with Google is not available yet.</p>
              <p>I will add this feature later.</p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            onClick={() => window.scrollTo(0, 0)}
            className="text-purple-400 hover:underline"
          >
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
