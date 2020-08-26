
const cityLocation = { lat: 0, lng: 0 };
const deviceLocation = { lat: 0, lng: 0 };

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
      window.weather_data = data;
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
  button.textContent = 'Go!'
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
        cityLocation.lat = data.results[0].geometry.location.lng;
      })
      .catch(error => console.log(error));
  };

  location.append(input, button);
};

const getDeviceLocation = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    deviceLocation.lat = pos.lat;
    deviceLocation.lng = pos.lng;
  });
  console.log(deviceLocation);
};

window.onload = () => {
  importGoogleSrc();
  getDeviceLocation();
  cityAutocomplete();
};

document.head.appendChild(importGoogleSrc());