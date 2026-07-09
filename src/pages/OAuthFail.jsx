import { Link, useSearchParams } from "react-router-dom";

const OAuthFail = () => {
  const [searchParams] = useSearchParams();

  const rawError = searchParams.get("error");
  let errorMessage = "Something went wrong during Google sigin-in";

  if (rawError) {
    try {
      const parsed = JSON.parse(rawError);
      errorMessage = parsed.message || errorMessage;
    } catch (error) {
      errorMessage = rawError;
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-400"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 className="mt-5 text-xl font-bold text-white">
          Google Sign-In Failed
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          {errorMessage}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/signin"
            className="w-full rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110"
          >
            Back to Sign In
          </Link>
          <Link
            to="/"
            className="w-full rounded-full border border-white/15 px-6 py-3 text-sm text-gray-300 transition hover:bg-white/10"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OAuthFail;
