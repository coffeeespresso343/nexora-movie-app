import { motion } from "motion/react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-2 mb-10"
      >
        <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">
          N
        </span>
        <span className="text-2xl font-semibold tracking-wide text-white">
          Nexora
        </span>
      </motion.div>

      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="h-2 w-2 rounded-full bg-purple-500"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
