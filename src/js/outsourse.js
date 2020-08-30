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

export const getDeviceLocation = () => {
  console.warn('START GET LOCATION');
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
