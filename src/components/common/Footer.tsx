import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Careerone Portfolio</p>
            <p className="text-sm">National Career Guidance Platform of Sri Lanka</p>
          </div>
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} Careerone. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 