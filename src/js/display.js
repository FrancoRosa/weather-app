/* global google */

import { temp, speed } from './converters';
import { getCityLocation } from './maps';
import setBackground from './imgs';

let metric = true;
let weatherData = {};

const changeUnits = () => {
  const temperature = document.querySelector('.temperature');
  const wind = document.querySelector('.wind');
  temperature.textContent = temp(weatherData.current.temp, metric);
  wind.textContent = `Wind: ${speed(weatherData.current.wind_speed, metric)}`;
};

const showDataContainer = (status) => {
  const container = document.querySelector('.weather-data');
  if (status) {
    container.classList.remove('hidden');
    document.querySelector('.loading-icon').classList.add('hidden');
  } else {
    container.classList.add('hidden');
    document.querySelector('.loading-icon').classList.remove('hidden');
  }
};

export const cityAutocomplete = () => {
  const input = document.querySelector('.city-name');
  const options = { types: ['(cities)'] };
  const searchBox = new google.maps.places.Autocomplete(input, options);
  const unitSwitch = document.querySelector('.unit-switch');
  metric = unitSwitch.checked;
  unitSwitch.onclick = () => {
    metric = unitSwitch.checked;
    changeUnits();
  };

  input.onkeyup = () => {
    document.querySelector('.weather-data').classList.add('hidden');
    document.querySelector('.loading-icon').classList.remove('hidden');
  };

  searchBox.addListener('place_changed', () => {
    showDataContainer(false);
    getCityLocation();
    setBackground();
  });
};


export const renderErrors = () => {
  const clearError = () => {
    document.querySelector('.name-error').classList.add('hidden');
    document.querySelector('.data-error').classList.add('hidden');
  };

  const nameError = () => {
    document.querySelector('.name-error').classList.remove('hidden');
  };

  const dataError = () => {
    document.querySelector('.data-error').classList.remove('hidden');
  };
  return {
    clearError,
    nameError,
    dataError,
  };
};

export const renderWeather = (data) => {
  weatherData = data;

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const icon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const message = document.querySelector('.message');

  icon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

  message.textContent = capitalize(data.current.weather[0].description);
  temperature.textContent = temp(data.current.temp, metric);
  wind.textContent = `Wind: ${speed(data.current.wind_speed, metric)}`;
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  showDataContainer(true);
};

export const renderCityName = (data) => {
  const container = document.querySelector('.city-name');
  container.value = data;
  setBackground();
};
