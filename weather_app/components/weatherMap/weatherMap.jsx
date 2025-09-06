import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WeatherMap = ({ coordinates, city }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([20, 0], 2);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(mapInstance.current);
    }

    if (coordinates && coordinates.lat && coordinates.lon) {
      const { lat, lon } = coordinates;
      
      mapInstance.current.setView([lat, lon], 10);
      
      if (markerRef.current) {
        mapInstance.current.removeLayer(markerRef.current);
      }
      
      const customIcon = L.divIcon({
        html: `<div class="custom-marker">
          <div class="marker-pin"></div>
          <div class="marker-pulse"></div>
        </div>`,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      });
      
      markerRef.current = L.marker([lat, lon], { icon: customIcon })
        .addTo(mapInstance.current)
        .bindPopup(`
          <div class="map-popup">
            <h4>📍 ${city}</h4>
            <p><strong>Coordinates:</strong><br>
            Lat: ${lat.toFixed(4)}°<br>
            Lon: ${lon.toFixed(4)}°</p>
          </div>
        `)
        .openPopup();
    }

    return () => {
      if (mapInstance.current && !coordinates) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coordinates, city]);

  return (
    <div className="weather-map">
      <div className="map-header">
        <h3>🗺️ Location Map</h3>
        {coordinates && (
          <div className="coordinates-info">
            <span>{coordinates.lat.toFixed(2)}°, {coordinates.lon.toFixed(2)}°</span>
          </div>
        )}
      </div>
      <div ref={mapRef} className="map-container"></div>
    </div>
  );
};

export default WeatherMap;
