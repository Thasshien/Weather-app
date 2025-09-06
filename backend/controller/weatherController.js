const axios = require("axios");

const API_KEY = process.env.API_KEY;

const generateAlerts = (forecast) => {
  const alerts = [];
  forecast.forEach(day => {
    const weatherMain = day.weather[0].main.toLowerCase();
    if (weatherMain.includes("rain")) {
      alerts.push({ type: 'rain', message: "Carry umbrella 🌧", severity: 'warning' });
    }
    if (day.main.temp > 35) {
      alerts.push({ type: 'heat', message: "Stay hydrated 🥵", severity: 'danger' });
    }
    if (day.wind.speed > 13.8) {
      alerts.push({ type: 'wind', message: "High winds warning 🌪", severity: 'danger' });
    }
  });
  
  const uniqueAlerts = [...new Map(alerts.map(a => [a.message, a])).values()];
  return uniqueAlerts;
};

const formatCurrentWeather = (data) => {
  const tzOffset = data.timezone; // seconds offset from UTC
  const getLocalTime = (unixTime) => {
    const date = new Date((unixTime + tzOffset) * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return {
    temperature: data.main.temp,
    feels_like: data.main.feels_like,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    wind_speed: data.wind.speed,
    wind_direction: data.wind.deg,
    pressure: data.main.pressure,
    visibility: (data.visibility / 1000).toFixed(1), // km
    sunrise: getLocalTime(data.sys.sunrise),
    sunset: getLocalTime(data.sys.sunset),
  };
};


const formatForecast = (list) => {
  const dailyMap = {};

  list.forEach(item => {
    const date = new Date(item.dt_txt).toDateString();
    if (!dailyMap[date]) {
      dailyMap[date] = item;
    }
  });

  return Object.values(dailyMap).slice(0, 5).map(item => ({
    date: item.dt_txt,
    day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
    temp_max: item.main.temp_max,
    temp_min: item.main.temp_min,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
  }));
};


const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.body;

    const currentRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const alerts = generateAlerts(forecastRes.data.list);

    res.json({
      city: currentRes.data.name,
      coordinates: {
        lat: currentRes.data.coord.lat,
        lon: currentRes.data.coord.lon,
      },
      current: formatCurrentWeather(currentRes.data),
      forecast: formatForecast(forecastRes.data.list),
      alerts,
    });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
};

const getWeatherByCoords = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    const currentRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const alerts = generateAlerts(forecastRes.data.list);

    res.json({
      city: currentRes.data.name,
      coordinates: {
        lat: currentRes.data.coord.lat,
        lon: currentRes.data.coord.lon,
      },
      current: formatCurrentWeather(currentRes.data),
      forecast: formatForecast(forecastRes.data.list),
      alerts,
    });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
};

module.exports = { getWeatherByCity, getWeatherByCoords };
