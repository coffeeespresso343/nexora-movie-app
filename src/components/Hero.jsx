import { Link } from "react-router-dom";

const FEATURES = [
  {
    label: "Unlimited streaming",
    icon: (
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
      >
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
    ),
  },
  {
    label: "New titles every week",
    icon: (
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
      >
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Cancel anytime",
    icon: (
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
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const Hero = () => {
  return (
    <section className="relative pt-16 h-screen w-full overflow-hidden text-white">
      <img
        src="hero.png"
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent"></div>
      <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black/20"></div>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl space-y-6">
          <h1 className="flex flex-col items-start text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="mb-2">Entertain, Explore</span>
            <span className="bg-linear-to-r from bg-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              Experience - Nexora
            </span>
          </h1>
          <p className="max-w-lg text-lg text-gray-300 md:text-xl">
            Unlimited movies, TV shows, and more - on any screen, the moment you
            want them.
          </p>

          <div className="flex items-center gap-3 md:gap-6 pt-4">
            <Link
              to="/movie"
              className="text-[12px] md:text-[16px] px-4 py-2 md:px-6 md:py-3 flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500  font-semibold shadow-lg shadow-purple-500/30 transition hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/200/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              <span className="whitespace-nowrap">Start Watching</span>
            </Link>
            <Link
              to="/genres"
              className="text-[12px] md:text-[16px] px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/20 text-white transition hover:scale-105 hover:bg-white/10"
            >
              Browse genres
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 pt-10 text-sm text-gray-300">
            {FEATURES.map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-purple-400">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
