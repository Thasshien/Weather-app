import React from 'react';
import './weatherCard.css';

const WeatherCard = ({ weather, city }) => {
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>📍 {city}</h2>
          <span className="timestamp">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="weather-icon">
          {getWeatherIcon(weather.icon)}
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="temperature">
            <span className="temp-value">{weather.temperature}</span>
            <span className="temp-unit">°C</span>
          </div>
          <div className="weather-description">
            {weather.description}
          </div>
          <div className="feels-like">
            Feels like {weather.feels_like}°C
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">💧</span>
            <div className="detail-info">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.humidity}%</span>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💨</span>
            <div className="detail-info">
              <span className="detail-label">Wind</span>
              <span className="detail-value">
                {weather.wind_speed} km/h {getWindDirection(weather.wind_direction)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">📊</span>
            <div className="detail-info">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.pressure} hPa</span>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">👁️</span>
            <div className="detail-info">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{weather.visibility} km</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sun-times">
        <div className="sun-item">
          <span className="sun-icon">🌅</span>
          <div>
            <div className="sun-label">Sunrise</div>
            <div className="sun-time">{weather.sunrise}</div>
          </div>
        </div>
        <div className="sun-item">
          <span className="sun-icon">🌇</span>
          <div>
            <div className="sun-label">Sunset</div>
            <div className="sun-time">{weather.sunset}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
