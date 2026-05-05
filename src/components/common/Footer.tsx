import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Left */}
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-lg font-semibold text-white">AutoMart</h2>
          <p className="text-sm">© 2025 AutoMart. All rights reserved.</p>
        </div>

        {/* Right - Social / Links */}
        <div className="flex gap-4">
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Facebook"
          >
            FB
          </a>
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Twitter"
          >
            TW
          </a>
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Instagram"
          >
            IG
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
