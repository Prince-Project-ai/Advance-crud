// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-custom-border text-custom-bg mt-auto border-t-color">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;