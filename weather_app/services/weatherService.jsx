import axios from "axios";

const url = "https://weather-app-67o9.onrender.com/"

const getWeatherData = async (city) => {
  try {
    let newurl = url + '/api/weather/city';
    const response = await axios.post(newurl,{city});
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    } else if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to fetch weather data. Please check your connection and try again.');
    }
  }
};

const getWeatherByCoords = async (lat, lon) => {
  try {
    let newurl = url + '/api/weather/coords'
    const response = await axios.post(newurl,{lat,lon});
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Failed to fetch weather data by location.'
    );
  }
};

export { getWeatherData, getWeatherByCoords };
