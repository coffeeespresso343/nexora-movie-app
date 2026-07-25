import { ArrowDown, PlayIcon, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const META = [
  {
    label: "9.2",
    icon: <Star size={13} className="fill-purple-400 text-purple-400" />,
  },
  { label: "Action · Sci-Fi · Drama" },
  { label: "4K Ultra HD" },
  { label: "150+ Countries" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden border-b border-b-gray-800 text-white">
      {/* Background */}
      <motion.img
        src="hero.png"
        alt="Hero background"
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:animate-none"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Cinematic grade: vignette + directional falloff instead of blurred blobs */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(139,92,246,0.18), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center pb-16 pt-10">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl space-y-6 lg:max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div
              variants={item}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-purple-300/90"
            >
              <span>Nexora Originals</span>
              <span className="text-purple-300/40">·</span>
              <span className="text-gray-400">New this week</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-black leading-[0.95] tracking-tight text-white"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
            >
              <span className="block">Every story,</span>
              <span className="block bg-linear-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                one screen away
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={item}
              className="max-w-md text-base leading-relaxed text-gray-300 sm:text-lg"
            >
              Discover films and series curated for how you actually watch — on
              any device, whenever you want them.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/movie"
                className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
              >
                <PlayIcon size={17} />
                Start Watching
              </Link>
              <Link
                to="/genres"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-white/10 active:scale-95"
              >
                Browse Genres
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5 text-xs text-gray-400"
            >
              {META.map((m, i) => (
                <span key={m.label} className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    {m.icon}
                    {m.label}
                  </span>
                  {i < META.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-gray-600" />
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-gray-400 motion-reduce:animate-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[11px] uppercase tracking-[0.15em]">
          Scroll to explore
        </span>
        <ArrowDown size={16} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-22 bg-linear-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;
