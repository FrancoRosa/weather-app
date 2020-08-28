
import Unsplash, { toJson } from "unsplash-js";
import eventMngr from './events';

const events = eventMngr();
let metric = true;

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
  unitSwitch.onclick = () => { metric = unitSwitch.checked };
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
        events.publish('cityLocated');
      })
      .catch(error => {
        console.log('No se encontro informacion de esa ciudad');
        console.log(error);
      });
  });
};

const getDeviceLocation = () => {
  console.warn('START GET LOCATION');
  navigator.geolocation.getCurrentPosition(position => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    cityLocation.lat = pos.lat;
    cityLocation.lng = pos.lng;
    events.publish('cityLocated');
    geocodeCityLocation();
  });
};

const getCityFromGeocode = (object) => {
  let cityname = object.plus_code.compound_code.split(' ');
  cityname.splice(0, 1);
  cityname = cityname.join(' ');
  console.log(">>>>>>>>>>");
  console.log(cityname);
  console.log(">>>>>>>>>>");
  return cityname;
};

const geocodeCityLocation = () => {
  let cityName = '';
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: cityLocation }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        console.log(results[0].formatted_address);
        cityName = getCityFromGeocode(results[0]);
        renderCityName(cityName);
      }
      console.log('No results found');
    } else {
      console.log(`Geocoder failed due to:  ${status}`);
    }
    cityName = 'Could not find city name';
  });
  return cityName;
};

const askWeatherTrigger = () => {
  console.warn('ASK WEATHER TRIGGER');
  if (displayLocation.lat !== cityLocation.lat && displayLocation.lng !== cityLocation.lng) {
    askWeather(cityLocation.lat, cityLocation.lng);
    // geocodeCityLocation();
    displayLocation.lat = cityLocation.lat;
    displayLocation.lng = cityLocation.lng;
  }
};

const renderWeather = (data) => {
  const container = document.querySelector('.weather-data');
  const icon = createComponent('img');
  icon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
  container.innerHTML = '';
  container.append(
    icon,
    createComponent('p', '', `Temp: ${data.current.temp}`),
    createComponent('p', '', `Hum: ${data.current.humidity}%`),
    createComponent('p', '', `Wind: ${data.current.wind_speed}`),
    createComponent('p', '', `UV: ${data.current.uvi}`),
    createComponent('p', '', `Descrip: ${data.current.weather[0].description}`),
    createComponent('p', '', `Icon: ${data.current.weather[0].icon}`),
  );
};

const renderCityName = (data) => {
  const container = document.querySelector('.city-name');
  container.value = data;
};

events.subscribe('cityLocated', askWeatherTrigger);

async function getImage(key, container) {
  const json = await unsplash.search.photos(key, 1, 5, { orientation: 'landscape' }).then(toJson);
  container.src = json.results[0].urls.small;
}

window.onload = () => {
  importGoogleSrc();
  getDeviceLocation();
  cityAutocomplete();
  const image = createComponent('img');
  getImage('cats', image);
  document.body.appendChild(image);
};

document.head.appendChild(importGoogleSrc());


