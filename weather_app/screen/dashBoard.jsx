import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/weatherCard/weatherCard';
import SearchBar from '../components/searchBar/searchBar';
import ForecastCard from '../components/foreCast/foreCast';
import AlertsPanel from '../components/alertsPanel/alertsPanel';
import WeatherMap from '../components/weatherMap/weatherMap';
import Navbar from '../components/navbar/navbar';
import { getWeatherData, getWeatherByCoords } from '../services/weatherService';
import './Dashboard.css';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);

    // Load theme preference
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);

    // Load default city or last searched city
    if (history.length > 0) {
      handleSearch(history[0]);
    } else {
      // Try to get user's location
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await getWeatherByCoords(latitude, longitude);
            setWeatherData(data);
          } catch (err) {
            console.error('Error fetching weather by location:', err);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      
      // Update search history
      const newHistory = [city, ...searchHistory.filter(item => item !== city)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme.toString());
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      <Navbar onThemeToggle={toggleTheme} darkMode={darkMode} />
      
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="search-section">
            <SearchBar onSearch={handleSearch} loading={loading} />
            
            {searchHistory.length > 0 && (
              <div className="search-history">
                <h3>🕒 Recent Searches</h3>
                <div className="history-buttons">
                  {searchHistory.map((city, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(city)}
                      className="history-button"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">❌</span>
              <p>Error: {error}</p>
            </div>
          )}

          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading weather data...</p>
            </div>
          )}

          {weatherData && !loading && (
            <div className="weather-content fade-in">
              <AlertsPanel alerts={weatherData.alerts} />
              
              <div className="main-weather-section">
                <div className="weather-cards">
                  <WeatherCard weather={weatherData.current} city={weatherData.city} />
                  <ForecastCard forecast={weatherData.forecast} />
                </div>
                
                <div className="map-section">
                  <WeatherMap coordinates={weatherData.coordinates} city={weatherData.city} />
                </div>
              </div>
            </div>
          )}

          {!weatherData && !loading && !error && (
            <div className="welcome-message">
              <div className="welcome-card">
                <h2>🌤️ Welcome to Weather Dashboard</h2>
                <p>Search for a city to get started with weather information</p>
                <div className="welcome-features">
                  <div className="feature">
                    <span className="feature-icon">🌡️</span>
                    <span>Current Weather</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📅</span>
                    <span>5-Day Forecast</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🚨</span>
                    <span>Weather Alerts</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🗺️</span>
                    <span>Interactive Map</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
