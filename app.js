const apiKey = '004c352d8bf5acb11be838ba9a25e95b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            const celsiusTemp = Math.round(data.main.temp);
            const fahrenheitTemp = convertCelsiusToFahrenheit(celsiusTemp);
            temperatureElement.textContent = `${celsiusTemp}°C / ${fahrenheitTemp}°F`;
            descriptionElement.textContent = data.weather[0].description;

            // Construct the weather icon URL
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            // Set the src attribute of the weather icon image
            weatherIconElement.src = iconUrl;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}


function convertCelsiusToFahrenheit(celsius) {
    return (celsius * 1.8) + 32;
}


