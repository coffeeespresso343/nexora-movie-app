import React from "react";

const Footer = () => {
  return (
    <footer class="bg-neutral-primary-soft rounded-base shadow-xs border border-default">
      <hr className="border-gray-800 sm:mx-auto lg:my-2" />
      <div className="w-full max-w-7-xl mx-auto p-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              N
            </span>
            <h3 className="text-white text-xl font-semibold tracking-wide">
              Nexora
            </h3>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
            <li>
              <a
                href="#"
                className="cursor-not-allowed hover:underline me-4 md:me-6 text-gray-100"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="cursor-not-allowed hover:underline me-4 md:me-6 text-gray-100"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="cursor-not-allowed hover:underline me-4 md:me-6 text-gray-100"
              >
                Licensing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="cursor-not-allowed hover:underline text-gray-100"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <span className="block text-gray-100 text-sm text-body sm:text-center">
          © {new Date().getFullYear()}{" "}
          <a href="" class="hover:underline">
            Nexora
          </a>
          . All Rights Reserved.{" "}
        </span>
        <span className="block text-gray-100 text-sm text-body sm:text-center">
          Developed by{" "}
          <span className="text-gray-300">
            <a
              className="hover:underline hover:text-purple-400"
              target="_blank"
              href="https://github.com/coffeeespresso343"
            >
              Linn Khant
            </a>
          </span>
        </span>
        <span className="block text-gray-100 text-sm text-body sm:text-center">
          [Build with Heart and too much Coffee]
        </span>
      </div>
    </footer>
  );
};

export default Footer;
