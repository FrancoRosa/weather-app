import eventMngr from './events';

const events = eventMngr();

const getWeatherURL = (lat, lon) => {
  const WEATHER_SERVER = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=daily,hourly,minutely&appid={key}';
  const url = WEATHER_SERVER.replace('{lat}', lat).replace('{lon}', lon).replace('{key}', process.env.OW_API_KEY);
  return url;
};

const askWeather = async (lat, lon) => {
  const response = await fetch(getWeatherURL(lat, lon), {
    mode: 'cors',
  });
  const data = await response.json();
  events.publish('weatherDataFound', data);
};

export default askWeather;
