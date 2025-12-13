import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main
        className="flex-1 w-full
          pt-[64px] sm:pt-[72px] md:pt-[80px]
          px-4 sm:px-6 lg:px-8"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;