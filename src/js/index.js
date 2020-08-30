
import Unsplash, { toJson } from "unsplash-js";
import eventMngr from './events';
import { temp, speed } from './converters';
import { getDeviceLocation } from './outsourse';
const events = eventMngr();
let metric = true;
let weatherData = {};
window.weatherData = weatherData;

const unsplash = new Unsplash({
  accessKey: `${process.env.UNSPLASH_ACCESS}`,
  secretKey: `${process.env.UNSPLASH_SECRET}`,
});

const cityLocation = { lat: 0, lng: 0 };
const displayLocation = { lat: 0, lng: 0 };
window.cityLocation = cityLocation;
window.displayLocation = displayLocation;

const getWeatherURL = (lat, lon) => {
  const WEATHER_SERVER = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=daily,hourly,minutely&appid={key}";
  const url = WEATHER_SERVER.replace('{lat}', lat).replace('{lon}', lon).replace('{key}', process.env.OW_API_KEY);
  return url;
};

const askWeather = (lat, lon) => {
  fetch(getWeatherURL(lat, lon), {
    mode: 'cors',
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      weatherData = data;
      window.weatherData = data;
      renderWeather(data);
    })
    .catch(error => console.log(error));
};

const importGoogleSrc = () => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_NAM_API_KEY}&libraries=places`;
  script.defer = true;
  return script;
};

const createComponent = (type, classes, content) => {
  const element = document.createElement(type);
  if (classes) element.classList = classes;
  if (content) element.innerHTML = content;
  return element;
};

const cityAutocomplete = () => {
  const input = document.querySelector('.city-name');
  const options = { types: ['(cities)'] };
  const searchBox = new google.maps.places.Autocomplete(input, options);
  const unitSwitch = document.querySelector('.unit-switch');
  metric = unitSwitch.checked;
  unitSwitch.onclick = () => { 
    metric = unitSwitch.checked;
    changeUnits();
  };
  searchBox.addListener('place_changed', () => {
    const GoogleServer = 'https://maps.googleapis.com/maps/api/geocode/json?address={city}&key={geo_key}';
    const city = input.value;
    const GeoUrl = GoogleServer
      .replace('{geo_key}', process.env.GOOGLE_GEO_API_KEY)
      .replace('{city}', city)
      .replace(' ', '%20');
    fetch(GeoUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data =>{
        cityLocation.lat = data.results[0].geometry.location.lat;
        cityLocation.lng = data.results[0].geometry.location.lng;
        events.publish('cityLocated', cityLocation);
      })
      .catch(error => {
        console.log('No se encontro informacion de esa ciudad');
        console.log(error);
      });
  });
};

const changeUnits = () => {
  const temperature = document.querySelector('.temperature');
  const wind = document.querySelector('.wind');
  temperature.textContent = temp(weatherData.current.temp, metric);
  wind.textContent = `Wind: ${speed(weatherData.current.wind_speed, metric)}`;
};

const askWeatherTrigger = (data) => {
  askWeather(data.lat, data.lng);
};

const renderWeather = (data) => {
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
};

const renderCityName = (data) => {
  const container = document.querySelector('.city-name');
  container.value = data;
};

events.subscribe('cityLocated', data => askWeatherTrigger(data));
events.subscribe('cityNameFound', name => renderCityName(name));

async function getImage(key, container) {
  const json = await unsplash.search.photos(key, 1, 5, { orientation: 'landscape' }).then(toJson);
  container.src = json.results[0].urls.small;
}

window.onload = () => {
  importGoogleSrc();
  getDeviceLocation();
  cityAutocomplete();
  // const image = createComponent('img');
  // getImage('cats', image);
  // document.body.appendChild(image);
};

document.head.appendChild(importGoogleSrc());
