
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <a href="/">MyLogo</a>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-accent transition-colors">Home</a>
          <a href="/about" className="text-white hover:text-accent transition-colors">About</a>
          <a href="/services" className="text-white hover:text-accent transition-colors">Services</a>
          <a href="/contact" className="text-white hover:text-accent transition-colors">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
