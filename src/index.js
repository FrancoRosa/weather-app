
const cityLocation = { lat: 0, lng: 0 };
const displayLocation = { lat: 0, lng: 0 };

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
  const location = document.querySelector('.location');
  const logs = document.querySelector('.logs');
  const input = document.createElement('input');
  const button = document.createElement('button');
  button.textContent = 'Go!';
  input.placeholder = 'Enter a city name';
  const options = { types: ['(cities)'], };
  const searchBox = new google.maps.places.Autocomplete(input, options);

  button.onclick = () => {
    const log = document.createElement('p');
    const city = input.value;
    logs.appendChild(log);
    const G_GEOLOC_API = 'AIzaSyCPWoduaS1Ohpkb4jnaiyWNp5xgNs61j3U';
    const GoogleServer = 'https://maps.googleapis.com/maps/api/geocode/json?address={city}&key={geo_key}'
    const GeoUrl = GoogleServer.replace('{geo_key}', process.env.GOOGLE_GEO_API_KEY).replace('{city}', city).replace(' ', '%20');
    fetch(GeoUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data =>{
        cityLocation.lat = data.results[0].geometry.location.lat;
        cityLocation.lng = data.results[0].geometry.location.lng;
        console.log('Clicked');
        console.log(cityLocation);
      })
      .catch(error => {
        console.log('No se encontro informacion de esa ciudad');
        console.log(error);
      });
  };

  location.append(input, button);
};

const getDeviceLocation = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    cityLocation.lat = pos.lat;
    cityLocation.lng = pos.lng;
  });
  console.log(cityLocation);
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
  if (displayLocation.lat !== cityLocation.lat && displayLocation.lng !== cityLocation.lng) {
    askWeather(cityLocation.lat, cityLocation.lng);
    geocodeCityLocation();
    displayLocation.lat = cityLocation.lat;
    displayLocation.lng = cityLocation.lng;
  }
};

const renderWeather = (data) => {
  const container = document.querySelector('.weather-data');
  container.innerHTML = '';
  container.append(
    createComponent('p', '', `Temp: ${data.current.temp}`),
    createComponent('p', '', `Hum: ${data.current.humidity}`),
    createComponent('p', '', `Wind: ${data.current.wind}`),
    createComponent('p', '', `UV: ${data.current.uvi}`),
    createComponent('p', '', `Descrip: ${data.current.weather[0].description}`),
    createComponent('p', '', `Icon: ${data.current.weather[0].icon}`),
  );
};

const renderCityName = (data) => {
  const container = document.querySelector('.city-name');
  container.textContent = data;
};

window.onload = () => {
  importGoogleSrc();
  getDeviceLocation();
  cityAutocomplete();
};

setInterval(() => {
  askWeatherTrigger();
}, 10000);

document.head.appendChild(importGoogleSrc());
