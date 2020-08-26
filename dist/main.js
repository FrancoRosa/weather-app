/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst cityLocation = { lat: 0, lng: 0 };\nconst deviceLocation = { lat: 0, lng: 0 };\n\nconst getWeatherURL = (lat, lon) => {\n  const WEATHER_SERVER = \"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=daily,hourly,minutely&appid={key}\";\n  const url = WEATHER_SERVER.replace('{lat}', lat).replace('{lon}', lon).replace('{key}', \"37fe7dced1adaf904d0ca7f5e66ff95b\");\n  return url;\n};\n\nconst askWeather = (lat, lon) => {\n  fetch(getWeatherURL(lat, lon), {\n    mode: 'cors',\n    method: 'GET',\n  })\n    .then(response => response.json())\n    .then(data => {\n      console.log(data);\n      window.weather_data = data;\n    })\n    .catch(error => console.log(error));\n};\n\nconst importGoogleSrc = () => {\n  const script = document.createElement('script');\n  script.src = `https://maps.googleapis.com/maps/api/js?key=${\"AIzaSyC-CH2v8wUZ-hnpkgdUgdr2iEOVj1os0rs\"}&libraries=places`;\n  script.defer = true;\n  return script;\n};\n\nconst createComponent = (type, classes, content) => {\n  const element = document.createElement(type);\n  if (classes) element.classList = classes;\n  if (content) element.innerHTML = content;\n  return element;\n};\n\nconst cityAutocomplete = () => {\n  const location = document.querySelector('.location');\n  const logs = document.querySelector('.logs');\n  const input = document.createElement('input');\n  const button = document.createElement('button');\n  button.textContent = 'Go!'\n  input.placeholder = 'Enter a city name';\n  const options = { types: ['(cities)'], };\n  const searchBox = new google.maps.places.Autocomplete(input, options);\n\n  button.onclick = () => {\n    const log = document.createElement('p');\n    const city = input.value;\n    logs.appendChild(log);\n    const G_GEOLOC_API = 'AIzaSyCPWoduaS1Ohpkb4jnaiyWNp5xgNs61j3U';\n    const GoogleServer = 'https://maps.googleapis.com/maps/api/geocode/json?address={city}&key={geo_key}'\n    const GeoUrl = GoogleServer.replace('{geo_key}', \"AIzaSyCPWoduaS1Ohpkb4jnaiyWNp5xgNs61j3U\").replace('{city}', city).replace(' ', '%20');\n    fetch(GeoUrl, { method: 'GET' })\n      .then(response => response.json())\n      .then(data =>{\n        cityLocation.lat = data.results[0].geometry.location.lat;\n        cityLocation.lat = data.results[0].geometry.location.lng;\n      })\n      .catch(error => console.log(error));\n  };\n\n  location.append(input, button);\n};\n\nconst getDeviceLocation = () => {\n  navigator.geolocation.getCurrentPosition(position => {\n    const pos = {\n      lat: position.coords.latitude,\n      lng: position.coords.longitude,\n    };\n    deviceLocation.lat = pos.lat;\n    deviceLocation.lng = pos.lng;\n  });\n  console.log(deviceLocation);\n};\n\nwindow.onload = () => {\n  importGoogleSrc();\n  getDeviceLocation();\n  cityAutocomplete();\n};\n\ndocument.head.appendChild(importGoogleSrc());\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });