import { motion } from "motion/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-linear-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-[120px] font-bold leading-none text-transparent sm:text-[160px]"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="mt-4 text-center"
      >
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Page not found
        </h2>
        <p className="mt-3 max-w-md text-gray-400">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <Link
          to="/"
          className="rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110"
        >
          Go Home
        </Link>
        <Link
          to="/movie"
          className="rounded-full border border-white/15 px-6 py-3 text-sm text-gray-300 transition hover:bg-white/10"
        >
          Browse Movies
        </Link>
      </motion.div>

      {/* Decorative glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(168,85,247,0.12), transparent 60%)",
        }}
      />
    </div>
  );
};

export default NotFound;
