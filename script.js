// script.js

// Replace with your own API key from OpenWeatherMap
const API_KEY = '89b21b313f236bb69e427be9cef00685';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('searchButton').addEventListener('click', getWeather);

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
  fetch(url)
  .then(response => {
    if (!response.ok) {
      // Check the status code for specific errors
      if (response.status === 404) {
        throw new Error('City not found.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key.');
      } else {
        throw new Error('API error.');
      }
    }
    return response.json();
  })
  .then(data => displayWeather(data))
  .catch(error => showError(error.message));
}

function displayWeather(data) {
  const { name, main, weather } = data;
  document.getElementById('cityName').textContent = `Weather in ${name}`;
  document.getElementById('temperature').textContent = main.temp;
  document.getElementById('condition').textContent = weather[0].description;
  document.getElementById('humidity').textContent = main.humidity;

  // Show weather info and hide error message
  document.getElementById('weatherInfo').classList.remove('hidden');
  document.getElementById('error').classList.add('hidden');
}

function showError(message) {
  document.getElementById('error').textContent = message;
  document.getElementById('error').classList.remove('hidden');
  document.getElementById('weatherInfo').classList.add('hidden');
}