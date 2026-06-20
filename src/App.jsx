import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import Genres from "./pages/Genres";
import NewAndPopular from "./pages/NewAndPopular";

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/newAndPopular" element={<NewAndPopular />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
