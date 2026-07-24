import { PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    label: "Unlimited streaming",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
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
        width="22"
        height="22"
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
        width="22"
        height="22"
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
    <section className="relative pt-16  border-b border-b-gray-800 pb-5 h-screen max-h-150 md:max-h-180 w-full overflow-hidden  text-white">
      <img
        src="hero.png"
        alt="Hero background"
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/30" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="max-w-xl space-y-6 lg:max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-300">
              <span className="h-1.5 w-1.5 rounded-full animate-ping bg-purple-400 opacity-75" />
              New releases every week
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">Entertain, Explore</span>
              <span className="block bg-linear-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Experience Nexora
              </span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-gray-300 sm:text-lg">
              Unlimited movies, TV shows, and more — on any screen, the moment
              you want them.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/movie"
                className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition duration-300 ease-in-out hover:-translate-y-1 hover:brightness-110 active:scale-95"
              >
                <PlayIcon size={17} />
                Start Watching
              </Link>
              <Link
                to="/genres"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-white/10 active:scale-95"
              >
                Browse Genres
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {FEATURES.map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 backdrop-blur-sm"
                >
                  <span className="text-purple-400">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-22 bg-linear-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;
