import React from 'react';
import './navbar.css';

const Header = ({ onThemeToggle, darkMode }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>🌤️ Weather Dashboard</h1>
        </div>
        
        <div className="header-right">
          <button 
            className="theme-toggle"
            onClick={onThemeToggle}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
