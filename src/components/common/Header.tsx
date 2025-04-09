import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Careerone Portfolio</Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-gray-200">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-gray-200">Profile</Link></li>
              <li><Link to="/education" className="hover:text-gray-200">Education</Link></li>
              <li><Link to="/experience" className="hover:text-gray-200">Experience</Link></li>
              <li><Link to="/cv-generator" className="hover:text-gray-200">CV Generator</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 