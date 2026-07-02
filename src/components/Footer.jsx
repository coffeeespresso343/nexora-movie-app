import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const NAVIGATION_LINKS = [
  { label: "About", href: "#about" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Licensing", href: "#licensing" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/coffeeespresso343",
    icon: "👨‍💻",
  },
];

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="bg-neutral-primary-soft rounded-base shadow-xs border border-t-gray-800 mt-12">
      <div className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-start md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                N
              </span>
              <h3 className="text-white text-xl font-semibold tracking-wide">
                Nexora
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate streaming destination
            </p>
            <p className="text-gray-400 text-xs">
              Made with passion for movie lovers
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="md:col-span-2">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-100 text-sm hover:text-purple-400 transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="border-gray-800 my-6" />

        <div className="space-y-3 mb-6">
          <p className="text-gray-100 text-xs sm:text-sm text-center">
            © {currentYear} <span className="font-medium">Nexora</span>. All
            Rights Reserved.
          </p>

          <p className="text-gray-100 text-xs sm:text-sm text-center">
            Developed by{" "}
            <a
              href="https://github.com/coffeeespresso343"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-purple-300 transition-colors duration-200 font-medium"
              aria-label="GitHub profile of Linn Khant"
            >
              Linn Khant
            </a>
          </p>

          <p className="text-gray-100 text-xs sm:text-sm text-center">
            Built with Heart and too much Coffee
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
