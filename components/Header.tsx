
import React from 'react';

interface HeaderProps {
  currentView: string;
  setView: (view: 'onboarding' | 'journey' | 'dashboard') => void;
}

const NavLink: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-700'
    }`}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-700">
              <span className="text-gray-500">Donor</span>Journey
            </h1>
          </div>
          <nav className="flex items-center space-x-2 md:space-x-4">
             <NavLink isActive={currentView === 'onboarding' || currentView === 'journey'} onClick={() => setView('onboarding')}>
              My Journey
            </NavLink>
             <NavLink isActive={currentView === 'dashboard'} onClick={() => setView('dashboard')}>
              NGO Analytics
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
