import '../css/style.css';
import askWeather from './weather';
import eventMngr from './events';
import { getDeviceLocation, importGoogleSrc } from './maps';
import {
  cityAutocomplete,
  renderCityName,
  renderWeather,
  renderErrors,
} from './display';


const events = eventMngr();
const errors = renderErrors();
events.subscribe('cityNameFound', name => renderCityName(name));
events.subscribe('weatherDataFound', data => renderWeather(data));
events.subscribe('cityLocated', data => {
  askWeather(data.lat, data.lng);
  errors.clearError();
});
events.subscribe('cityNotLocated', errors.nameError);
events.subscribe('weatherDataNotFound', errors.dataError);

document.head.appendChild(importGoogleSrc());

window.onload = () => {
  importGoogleSrc();
  getDeviceLocation();
  cityAutocomplete();
};
