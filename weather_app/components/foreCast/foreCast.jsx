import React from 'react';
import './foreCast.css';

const ForecastCard = ({ forecast }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="forecast-card">
      <div className="forecast-header">
        <h3>📅 5-Day Forecast</h3>
      </div>
      
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-day">
              <span className="day-name">{formatDate(day.date)}</span>
              <span className="day-date">{day.day}</span>
            </div>
            
            <div className="forecast-weather">
              <span className="forecast-icon">
                {getWeatherIcon(day.icon)}
              </span>
              <div className="forecast-desc-container">
                <span className="forecast-desc">{day.description}</span>
              </div>
            </div>
            
            <div className="forecast-temps">
              <div className="temp-range">
                <span className="temp-max">{day.temp_max}°</span>
                <div className="temp-bar">
                  <div 
                    className="temp-fill" 
                    style={{width: `${((day.temp_max - day.temp_min) / 40) * 100}%`}}
                  ></div>
                </div>
                <span className="temp-min">{day.temp_min}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
