const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const city = req.query.city; 
    const apiKey = process.env.WEATHER_API_KEY;

    if (!city) return res.status(400).json({ error: "City name is required" });

    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);
        const data = weatherResponse.data;

        const weatherResult = {
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon, 
            coordinates: data.coord,
            feels_like: data.main.feels_like,
            wind_speed: data.wind.speed,
            country_code: data.sys.country,
            rain_volume: (data.rain && data.rain['3h']) ? data.rain['3h'] : 0 
        };

        let countryInfo = {};
        try {
            const countryUrl = `https://restcountries.com/v3.1/alpha/${weatherResult.country_code}`;
            const countryResponse = await axios.get(countryUrl);
            const countryData = countryResponse.data[0];
            const currencyKey = Object.keys(countryData.currencies)[0];

            countryInfo = {
                currency: countryData.currencies[currencyKey].name,
                currency_symbol: countryData.currencies[currencyKey].symbol,
                population: countryData.population,
                flag: countryData.flags.png,
                capital: countryData.capital ? countryData.capital[0] : "No Capital", 
                region: countryData.region, 
                googleMaps: countryData.maps.googleMaps 
            };
        } catch (err) {
            console.log("Error fetching country data:", err.message);
            countryInfo = { error: "Could not fetch extra country data" };
        }

        res.json({
            weather: weatherResult,
            country_facts: countryInfo
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching data. Check city name." });
    }
});

module.exports = router;