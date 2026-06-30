import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const { signup, loginWithGoogle, isLoading } = useAuth();

  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    const result = await signup({ name, email, password });

    if (result.success) {
      navigate(redirectTo);
    } else {
      setFormError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/8 p-8">
        <h1 className="text-2xl font-bold text-white">
          Get{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent ">
            Started
          </span>
        </h1>
        <p className="mt-2 text-center text-sm text-gray-400">
          Create an account to start watching.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm text-gray-300">
              Name
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none transition focus:border-purple-500/60"
              type="text"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-gray-300">
              Email
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none transition focus:border-purple-500/60"
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-gray-300">
              password
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none transition focus:border-purple-500/60"
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {formError && <p className="text-sm text-red-400">{formError}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-4 py-2.5 font-semibold shadow-lg shadow-purple-500/30 transition hover:brightness-110 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? "Creating account..." : "Get Started"}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs tracking-wider text-gray-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          title="Coming Soon..."
          onClick={loginWithGoogle}
          className="cursor-not-allowed mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-medium text-white transition hover:bg-white/10"
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

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            onClick={() => window.scrollTo(0, 0)}
            className="text-purple-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
