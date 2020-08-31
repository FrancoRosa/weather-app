# weather web-app
> This is a weather web-app that can retrieve the current weather for your current city or the one you type.

<p align="center">
  <img width="560" height="560" src="./src/img/demo.gif">
</p>

In this project, I use async functions to get data from the following sources:

- [OpenWeather](https://openweathermap.org/api)
- [Unsplash](https://unsplash.com/developers)
- [Google Geolocation](https://developers.google.com/maps/documentation/geolocation/overview)

To let the app know your current city, enable the location permission on your browser, by default you will be asked the first time you load the page. 


## Live Demo
I will feel honored if you try my app and tell me how to improve it.
it is hosted on a Netlify Free account so be patient, sometimes it takes a while to load.
[weather-app](https://everyweather.netlify.com)

## Built With

- JavaScript
- Webpack
- HTML, CSS
- Deploy on [Netlify](https://www.netlify.com)

## Deploy
To deploy this project locally, download or clone this repo
1. Use the LiveView extension on VScode deploy this project, then open this port on your browser:
```
    http://localhost:5500/dist/
```
2. If you make any changes use webpack to create the _main.js_ file with:
```
    $ npx webpack
```
3. For continuous creation of _main.js_ on any source changes, run:
```
    $ npx webpack --watch
```


## Author

👤 Franco Rosa

- Github: [@FrancoRosa](https://github.com/FrancoRosa)
- Linkedin: [Franco Rosa](https://www.linkedin.com/in/francoro)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check the [issues page](issues/).

## Show your support

Give an ⭐️ if you like this project!

## Acknowledgments

- [Unsplash](https://unsplash.com) for the images I use in this project.
- [OpenWeather](https://openweathermap.org) for the weather data shown in this project.
- [Google Maps Plataform](https://developers.google.com/maps/documentation) for the autocomplete feature and the ability to get the device's location.
- Team #94 Capricornus Microverse, for the morning code reviews.

## 📝 License

This project is [MIT](lic.url) licensed.