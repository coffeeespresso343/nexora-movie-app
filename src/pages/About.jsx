import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TECH_STACK = [
  { label: "React", description: "UI library" },
  { label: "Vite", description: "Build tool" },
  { label: "Tailwind CSS", description: "Styling" },
  { label: "React Router", description: "Client-side routing" },
  { label: "TMDB API", description: "Movie & series data" },
  { label: "Appwrite Cloud", description: "Auth, database, storage" },
  { label: "Vercel", description: "Deployment" },
];

const FEATURES = [
  {
    title: "Curated Home Feed",
    description:
      "Netflix-style horizontal rows — Popular, Top Rated, Now Playing, and Upcoming — each fetched independently so one slow request never blocks the rest.",
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
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Real Trending Data",
    description:
      "The Trending Now strip isn't just TMDB's popularity ranking — it's driven by what users actually search for, tracked live in an Appwrite database.",
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
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: "Movies & Series",
    description:
      "Dedicated browse pages with debounced search and pagination. Searching for a series on the Movies page? It auto-retries with TV results instead of showing an empty state.",
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
        <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <path d="M12 12h.01" />
      </svg>
    ),
  },
  {
    title: "Genre Browsing",
    description:
      "Genre chips fetched live from TMDB — no hardcoded list that goes stale. Select one and a paginated grid of filtered movies appears in place.",
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
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: "Full Authentication",
    description:
      "Email/password sign up and Google OAuth via Appwrite, using the token-exchange flow so sessions live on your domain — not blocked by third-party cookie restrictions.",
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
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Profile & Settings",
    description:
      "Avatar upload via Appwrite Storage with per-file permissions, name editing, email and password changes, and account deactivation with password re-confirmation.",
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
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
      </svg>
    ),
  },
  {
    title: "Smart Scroll Restoration",
    description:
      "Back-navigation restores your exact scroll position instead of jumping to the top — a single ScrollManager component owns this globally so each page doesn't fight the browser.",
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
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    ),
  },
  {
    title: "New & Popular",
    description:
      "Weekly trending content across movies and series combined, powered by TMDB's trending endpoint. Multi-search filters out person results automatically.",
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
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

const About = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rbga(168,85,247,0.4), transparent 60%), radial-gradient(circle at 70% 50%, rgba(236,72,153,0.3), transparent 60%)",
          }}
        ></div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-300 mb-6">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-purple-400"></span>
            Open Source portfolio project
          </div>
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl leading-tight">
            About{" "}
            <span className="bg-linear-to-r from-purple-400 via-pink-500 to-pink-400 bg-clip-text text-transparent">
              Nexora
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A full-stack movies and series discovery app - built to learn, built
            to ship, built to look like something real.
          </p>
        </div>
      </section>

      {/* What is Nexora */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-2xl border shadow-lg shadow-purple-500/20 border-white/10 bg-white/5 p-8 md:p-10">
          <h2 className="text-2xl font-bold">
            What is{" "}
            <span className="bg-linear-to-r from-purple-400 via-pink-500 to-pink-400 bg-clip-text text-transparent">
              Nexora?
            </span>
          </h2>
          <div className="mt-4 space-y-4 text-gray-400 leading-relaxed">
            <p>
              Nexora is a streaming discovery app that lets you browse, search,
              and explore movies and TV series using live data from the Movie
              Database (TMDB). It's not a real streaming service - there's no
              video playback - but everything else is real: the data, the auth,
              the database, the storage, the search tracking.
            </p>
            <p>
              It was built as a learning project to go beyond tutorial-level
              React and build something with genuine full-stack complexity -
              authentication flows, third-party APIs, cloud storage with
              per-file permissions, OAuth token exchange, scroll restoration,
              and a UI that holds up across screen sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8">
          What it{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            does
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map(({ title, description, icon }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-5 flex gap-4 shadow-lg shadow-purple-500/20 transition duration-300 hover:-translate-y-0.5"
            >
              <span className="mt-0.5 shrink-0 text-purple-400">{icon}</span>
              <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8">
          Tech{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Stack
          </span>
        </h2>

        <div className="flex flex-wrap gap-3">
          {TECH_STACK.map(({ label, description }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
              <span className="text-sm font-medium text-white">{label}</span>
              <span className="text-xs text-gray-500">{description}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-gray-500">
            Movie and series data provided by{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              TMDB
            </a>
            . This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </section>

      {/* Developer Bio */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-2xl border shadow-lg shadow-purple-500/20 border-white/10 bg-white/5 p-8 md:p-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="shrink-0 rounded-full h-30 w-30">
              <img
                src="linn.jpg"
                alt="Linn Khant"
                className="object-cover h-30 w-30 rounded-full border border-purple-400"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
                Built by
              </p>
              <h2 className="text-2xl font-bold text-white">Linn Khant</h2>
              <p className="mt-3 text-gray-400 leading-relaxed">
                IT student studying Software Engineering, building real
                deployable projects to learn full-stack development the hard
                way. Nexora is one of those projects - started as a movie
                browsing exercises, grew into a full authentication system,
                cloud storage intergration, and a UI that actually looks like
                something worth using.
              </p>
              <p className="mt-3 text-gray-400 leading-relaxed">
                Curently working with React, Vite, Tailwind CSS, Spring Boot,
                and Appwrite Cloud. Interested in building things that are
                useful, fast, and well-designed.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://github.com/coffeeespresso343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300 transition hover:border-purple-500/40 hover:text-white hover:-translate-y-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://t.me/linnkhant343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300 transition hover:border-purple-500/40 hover:text-white hover:-translate-y-1"
                >
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
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                    <path d="m21.854 2.147-10.94 10.939" />
                  </svg>
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="text-2xl font-bold">Ready to explore?</h2>
        <p className="mt-3 text-gray-400">
          Sign in and start discovering movies and series.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/movie"
              className="rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition duration-300 hover:brightness-110 hover:-translate-y-1"
            >
              Start Explore
            </Link>
          ) : (
            <Link
              to="/signup"
              className="rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition duration-300 hover:brightness-110 hover:-translate-y-1"
            >
              Get Started
            </Link>
          )}

          <Link
            to="/"
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-white/10 active:scale-95"
          >
            Browse Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
