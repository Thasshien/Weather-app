import React, { useState } from 'react';
import './searchBar.css';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <div className="input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="search-input"
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !city.trim()}
          >
            {loading ? (
              <div className="button-spinner"></div>
            ) : (
              'Get Weather'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
