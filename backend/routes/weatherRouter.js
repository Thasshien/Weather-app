const express = require("express");
const router = express.Router();
const { getWeatherByCity, getWeatherByCoords } = require("../controller/weatherController");

router.post("/city", getWeatherByCity);
router.post("/coords", getWeatherByCoords);

module.exports = router;