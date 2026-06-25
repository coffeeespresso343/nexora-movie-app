import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Remembers scroll position per path in sessionStorage.
// - On forward navigation (PUSH): start at the top of the new page.
// - On back/forward browser navigation (POP): restore the position the
//   user was actually at, instead of snapping back to the top.
const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());

  useEffect(() => {
    // Stop the browser's native scroll restoration on hard refresh —
    // we're fully managing this ourselves now.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Save the scroll position of the page we're leaving, keyed by its path
    return () => {
      positions.current.set(location.pathname, window.scrollY);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (navigationType === "POP") {
      const savedY = positions.current.get(location.pathname);
      if (savedY != null) {
        // Defer until after the new page's content has rendered
        requestAnimationFrame(() => window.scrollTo(0, savedY));
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [location.pathname, navigationType]);

  return null;
};

export default ScrollManager;
