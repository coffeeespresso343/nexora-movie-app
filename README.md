# Nexora

A full-stack movie and series discovery app built with React, TMDB, and Appwrite — featuring real authentication, curated browsing, genre filtering, and a search experience backed by live user data.

## Features

**Browsing**
- Netflix-style home page with horizontally scrolling rows: Popular, Top Rated, Now Playing, and Upcoming movies
- "Trending Now" strip driven by real search activity — popularity is computed from what people actually search for, tracked via Appwrite
- Dedicated Movies and Series pages with debounced search and pagination
- Genre browsing with live-fetched genre chips (no hardcoded genre list)
- Detail pages for both movies and series, including trailer playback and top cast

**Authentication**
- Email/password sign up and sign in
- Google OAuth via Appwrite, using the token-exchange flow (`createOAuth2Token`) rather than session cookies, for compatibility with browsers that block third-party cookies
- Soft-gated routing: unauthenticated visitors can browse the home page, but navigating into protected areas redirects to sign in
- Persistent sessions across page refreshes

**Account management**
- Editable profile: name and avatar upload (stored in Appwrite Storage with per-user file permissions)
- Settings page for changing email and password
- Account deactivation (soft-delete) that immediately blocks login

**Polish**
- Scroll position is preserved on back-navigation and reset to top on forward navigation, instead of relying on default browser/router behavior
- Loading skeletons matched to actual card layouts to avoid layout shift
- Responsive, dark UI with a consistent purple-to-pink accent identity

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Movie/series data | [TMDB API](https://www.themoviedb.org/documentation/api) |
| Backend / Auth / Storage | [Appwrite](https://appwrite.io) (Cloud) |

## Getting Started

### Prerequisites

- Node.js 18+
- A free [TMDB account](https://www.themoviedb.org/signup) and API key
- A free [Appwrite Cloud](https://cloud.appwrite.io) project

### 1. Clone and install

```bash
git clone https://github.com/your-username/nexora.git
cd nexora
npm install
```

### 2. Set up Appwrite

In your Appwrite Cloud project:

1. **Database** — create a database and a collection for search-tracking. The collection needs these attributes:
   - `searchTerm` (string)
   - `count` (integer)
   - `movie_id` (integer)
   - `title` (string)
   - `poster_url` (string)
2. **Storage** — create a bucket for avatars with **File Security** enabled, and allow `create` access for authenticated users at the bucket level.
3. **Auth** — enable Email/Password sign-in, and enable the Google OAuth2 provider (requires a Google Cloud OAuth Client ID/Secret — see [Appwrite's OAuth2 guide](https://appwrite.io/docs/products/auth/google)).
4. **Platforms** — under Project Settings → Platforms, add a Web platform with your local dev URL (e.g. `http://localhost:5173`) and your deployed production URL.

### 3. Environment variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
VITE_APPWRITE_AVATAR_BUCKET_ID=your_appwrite_avatar_bucket_id
```

### 4. Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/      # Reusable UI: Navbar, MovieCard, SeriesCard, MovieRow, ProfileMenu, etc.
├── context/         # AuthContext — session state, login/signup/logout, profile management
├── pages/           # Route-level pages: Home, Movie, Series, Genres, Profile, Settings, etc.
├── appwrite.js      # Appwrite client setup and database/storage helper functions
└── App.jsx          # Route definitions and layout structure
```

## Known Limitations

- **Account deletion is a soft-delete, not a true delete.** Appwrite's client SDK intentionally cannot permanently delete a user account or their associated data — that requires a server-side Appwrite Function with an API key. Deactivating an account here blocks future logins immediately, but full data erasure isn't implemented yet.
- Trending data depends on real search activity accumulating in the Appwrite collection — on a fresh setup, the "Trending Now" row will be empty until a few searches have been made.

## License

This project was built as a personal learning project and portfolio piece. Feel free to explore the code, but please don't redistribute it as your own.
