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

    console.log("USER ID: " + userId);
    console.log("SECRET: " + secret);

    if (!userId || !secret) {
      navigate("/signin");
      return;
    }

    completeOAuthSession(userId, secret).then((result) => {
      navigate(result.success ? "/" : "/signin");
    });
  }, [searchParams, completeOAuthSession, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <p className="text-gray-400">Signing you in....</p>
    </div>
  );
};

export default AuthCallback;
