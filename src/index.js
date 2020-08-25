
const askWeather = () => {
  const lat = '-13.51';
  const lon = '-72.31';
  fetch(getWeatherURL(lat, lon), {
    mode: 'cors',
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

const getWeatherURL = (lat, lon) => {
  const WEATHER_SERVER = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={key}";
  const url = WEATHER_SERVER.replace('{lat}', lat).replace('{lon}', lon).replace('{key}', process.env.OW_API_KEY);
  return url;
};

window.onload = () => {
  document.querySelector('body').innerHTML = 'Hello World!';
  console.log('webpack working!');
  askWeather();
};