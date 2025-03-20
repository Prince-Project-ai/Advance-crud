// Layout.jsx
import React from "react";
import Header from "../Components/Site/Header";
import Footer from "../Components/Site/Footer";
import { useUserData } from "../Contexts/UserContext";
import FullScreenLoader from "../Components/Loader/FullScreenLoader";

const SiteLayout = ({ children }) => {
  const { isAuthenticated } = useUserData();

  return (
    <div className="min-h-screen flex flex-col bg-custom-bg"> {/* Set body background to custom-bg */}
      <Header />
      <main className="flex-grow pt-14 px-4 md:px-6 bg-custom-bg"> {/* Set main background to custom-bg */}
        <div className="max-w-7xl mx-auto py-4 w-full text-custom-light">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;