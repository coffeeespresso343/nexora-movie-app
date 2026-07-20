import { useScrollTop } from "../hooks/useScrollTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  useScrollTop();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* ScrollToTop later */}
    </div>
  );
};

export default MainLayout;
