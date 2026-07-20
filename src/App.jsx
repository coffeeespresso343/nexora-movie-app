import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Genres from "./pages/Genres";
import NewAndPopular from "./pages/NewAndPopular";
import MovieDetails from "./pages/MovieDetails";
import Series from "./pages/Series";
import SeriesDetails from "./pages/SeriesDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthCallback from "./pages/AuthCallback";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import OAuthFail from "./pages/OAuthFail";
import About from "./pages/About";
import { useToast } from "./context/ToastContext";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./pages/NotFound";

const PageTranslation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Common Layout */}
        <Route element={<MainLayout />}>
          {/* Public */}
          <Route
            path="/"
            element={
              <PageTranslation>
                <Home />
              </PageTranslation>
            }
          />

          <Route
            path="/about"
            element={
              <PageTranslation>
                <About />
              </PageTranslation>
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/movie"
              element={
                <PageTranslation>
                  <Movie />
                </PageTranslation>
              }
            />

            <Route
              path="/movie/:id"
              element={
                <PageTranslation>
                  <MovieDetails />
                </PageTranslation>
              }
            />

            <Route
              path="/series"
              element={
                <PageTranslation>
                  <Series />
                </PageTranslation>
              }
            />

            <Route
              path="/series/:id"
              element={
                <PageTranslation>
                  <SeriesDetails />
                </PageTranslation>
              }
            />

            <Route
              path="/genres"
              element={
                <PageTranslation>
                  <Genres />
                </PageTranslation>
              }
            />

            <Route
              path="/new-and-popular"
              element={
                <PageTranslation>
                  <NewAndPopular />
                </PageTranslation>
              }
            />

            <Route
              path="/profile"
              element={
                <PageTranslation>
                  <Profile />
                </PageTranslation>
              }
            />

            <Route
              path="/settings"
              element={
                <PageTranslation>
                  <Settings />
                </PageTranslation>
              }
            />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <PageTranslation>
                <NotFound />
              </PageTranslation>
            }
          />
        </Route>

        {/* Authentication pages without Navbar/Footer */}
        <Route path="/signin" element={<SignIn />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route path="/oauth-fail" element={<OAuthFail />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const { info } = useToast();
  const { isLoading } = useAuth();

  useEffect(() => {
    const name = localStorage.getItem("nexora_username");
    const isActiveTab = sessionStorage.getItem("nexora_active_tab");

    if (name && !isActiveTab) {
      sessionStorage.removeItem("nexora_active_tab", "1");
      setTimeout(() => {
        info(`Welcome back, ${name}! Good to see you again.`);
      }, 500);
    } else if (name) {
      sessionStorage.setItem("nexora_active_tab", "1");
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="isLoading" />}
        {!isLoading && <AnimatedRoutes />}
      </AnimatePresence>
    </>
  );
}

export default App;
