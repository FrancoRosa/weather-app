/* global google */

import eventMngr from './events';

const cityLocation = { lat: 0, lng: 0 };
const events = eventMngr();

const getCityFromGeocode = (object) => {
  let cityname = object.plus_code.compound_code.split(' ');
  cityname.splice(0, 1);
  cityname = cityname.join(' ');
  return cityname;
};

const geocodeCityLocation = () => {
  let cityName = '';
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: cityLocation }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        cityName = getCityFromGeocode(results[0]);
        events.publish('cityNameFound', cityName);
      }
    } else {
      cityName = 'Could not find city name';
      events.publish('cityNameFound', cityName);
    }
  });
};

export const getCityLocation = async () => {
  const city = document.querySelector('.city-name').value;
  const GoogleServer = 'https://maps.googleapis.com/maps/api/geocode/json?address={city}&key={geo_key}';
  const GeoUrl = GoogleServer
    .replace('{geo_key}', process.env.GOOGLE_GEO_API_KEY)
    .replace('{city}', city)
    .replace(' ', '%20');
  const response = await fetch(GeoUrl, { method: 'GET' });
  const data = await response.json();
  cityLocation.lat = data.results[0].geometry.location.lat;
  cityLocation.lng = data.results[0].geometry.location.lng;
  events.publish('cityLocated', cityLocation);
};

export const importGoogleSrc = () => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_NAM_API_KEY}&libraries=places`;
  script.defer = true;
  return script;
};

export const getDeviceLocation = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    cityLocation.lat = pos.lat;
    cityLocation.lng = pos.lng;
    geocodeCityLocation();
    events.publish('cityLocated', cityLocation);
  });
};
