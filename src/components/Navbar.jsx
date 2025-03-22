import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Study Book
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/week/1" className="hover:text-gray-400">
            Weeks
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;