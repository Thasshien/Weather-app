import React from 'react';
import './AlertsPanel.css';

const AlertsPanel = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'rain': return '🌧️';
      case 'heat': return '🥵';
      case 'cold': return '🥶';
      case 'wind': return '🌪️';
      case 'humidity': return '💧';
      case 'storm': return '⛈️';
      case 'snow': return '❄️';
      case 'fog': return '🌫️';
      default: return '⚠️';
    }
  };

  const getAlertClass = (severity) => {
    switch (severity) {
      case 'danger': return 'alert-danger';
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      default: return 'alert-info';
    }
  };

  const getSeverityText = (severity) => {
    switch (severity) {
      case 'danger': return 'High Priority';
      case 'warning': return 'Medium Priority';
      case 'info': return 'Advisory';
      default: return 'Notice';
    }
  };

  return (
    <div className="alerts-panel">
      <div className="alerts-header">
        <h3>🚨 Weather Alerts</h3>
        <span className="alerts-count">{alerts.length} Alert{alerts.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className={`alert-item ${getAlertClass(alert.severity)}`}
          >
            <div className="alert-content">
              <div className="alert-main">
                <span className="alert-icon">
                  {getAlertIcon(alert.type)}
                </span>
                <div className="alert-text">
                  <span className="alert-message">{alert.message}</span>
                  <span className="alert-severity">{getSeverityText(alert.severity)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
