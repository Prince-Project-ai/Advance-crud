// Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useUserData } from "../../Contexts/UserContext";

const Header = () => {
  const { isAuthenticated } = useUserData();
  return (
    <header className="fixed w-full backdrop-blur-sm top-0 z-10 bg-custom-bg shadow-md border-b-color">
      <nav className="px-4 py-3 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ul className="flex items-center justify-between">
            <li>
              <a
                href="#"
                className="text-custom-light hover:text-gray-300 transition-colors duration-200 text-lg font-medium"
              >
                sign-in || sign-up || crud || profile
              </a>
            </li>
            <li>
              <NavLink
                // to={isAuthenticated ? "/"}
                className="btn px-5 py-2 rounded-lg"
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;