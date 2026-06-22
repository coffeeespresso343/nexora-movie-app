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

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/newAndPopular" element={<NewAndPopular />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
