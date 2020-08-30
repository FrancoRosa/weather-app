
import { getDeviceLocation, importGoogleSrc } from './maps';
import { cityAutocomplete, renderCityName, renderWeather } from './display';
import askWeather from './weather';
import eventMngr from './events';

const events = eventMngr();
events.subscribe('cityNameFound', name => renderCityName(name));
events.subscribe('weatherDataFound', data => renderWeather(data));
events.subscribe('cityLocated', data => askWeather(data.lat, data.lng));

document.head.appendChild(importGoogleSrc());

window.onload = () => {
  importGoogleSrc();
  getDeviceLocation();
  cityAutocomplete();
};
