import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeOAuthSession } = useAuth();

  const hasRun = useRef(false); // guards against double-invocation in dev (StrictMode)

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;

    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    // console.log(window.location.href);
    // console.log(searchParams.toString());

    // console.log("userId:", searchParams.get("userId"));
    // console.log("secret:", searchParams.get("secret"));

    if (userId && secret) {
      completeOAuthSession(userId, secret).then((result) => {
        navigate(result.success ? "/" : "/oauth-fail");
      });
    } else {
      navigate("/oauth-fail");
    }
  }, [searchParams, completeOAuthSession, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="relative">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500"></div>
        <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500/10 blur-xl"></div>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">Signing you in...</h2>

      <p className="mt-2 text-sm text-gray-400">
        Verifying your Google account
      </p>
    </div>
  );
};

export default AuthCallback;
