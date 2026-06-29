import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Footer from "./components/Footer";
import Genres from "./pages/Genres";
import NewAndPopular from "./pages/NewAndPopular";
import MovieDetails from "./pages/MovieDetails";
import Hero from "./components/Hero";
import Series from "./pages/Series";
import SeriesDetails from "./pages/SeriesDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthCallback from "./pages/AuthCallback";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const AppLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <Navbar />
      {children}
      <Footer />
    </ProtectedRoute>
  );
};

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Hero />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <main>
      <Routes>
        {/* Public - no need authentication */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Protected */}
        <Route
          path="/movie"
          element={
            <AppLayout>
              <Movie />
            </AppLayout>
          }
        />
        <Route
          path="/series"
          element={
            <AppLayout>
              <Series />
            </AppLayout>
          }
        />
        <Route
          path="/series/:id"
          element={
            <AppLayout>
              <SeriesDetails />
            </AppLayout>
          }
        />
        <Route
          path="/genres"
          element={
            <AppLayout>
              <Genres />
            </AppLayout>
          }
        />
        <Route
          path="/new-and-popular"
          element={
            <AppLayout>
              <NewAndPopular />
            </AppLayout>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <AppLayout>
              <MovieDetails />
            </AppLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <AppLayout>
              <Profile />
            </AppLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <AppLayout>
              <Settings />
            </AppLayout>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
