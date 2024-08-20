const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // For path handling

const app = express();
const PORT = 3000;
const API_KEY = '409c1481e4c711c8333cc847e477275d'; // Replace with your actual OpenWeatherMap API key

app.use(cors());
app.use(express.json());

// Define static folder to serve HTML, CSS, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html from the public folder
});

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;

    // Step 1: Fetch current weather data using the city name
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const currentWeather = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            city: city,
            currentDate: new Date(response.data.dt * 1000).toLocaleDateString(),
        };

        // Respond with current weather
        res.json(currentWeather);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(404).send({ error: 'City not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
