import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const activeLinkStyle = {
    color: '#a78bfa', // A light violet color for the active link
  };

  return (
    // This <nav> is now a normal block element. 
    // The flexbox in App.jsx will position it correctly at the top.
    // We add z-10 to ensure it stays above other content if needed.
    <nav className="bg-gray-800 text-white shadow-lg w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="text-2xl font-bold tracking-wider">
          <NavLink to="/" className="hover:text-indigo-400 transition-colors duration-200">
            TyreScanner
          </NavLink>
        </div>

        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <NavLink 
              to="/" 
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              className="font-medium hover:text-indigo-400 transition-colors duration-200"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tollplaza"
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              className="font-medium hover:text-indigo-400 transition-colors duration-200"
            >
              Toll Plaza
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/getdb"
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              className="font-medium hover:text-indigo-400 transition-colors duration-200"
            >
              Dealer View
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/user-data"
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              className="font-medium hover:text-indigo-400 transition-colors duration-200"
            >
              User Search
            </NavLink>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;