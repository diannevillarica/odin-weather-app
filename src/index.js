import { get } from 'lodash';
import './stylesheets/styles.scss';

function App() {
  const app = document.createElement('div');

  let locationFromUser = 'sacramento';

  async function getGeoLocationData() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${locationFromUser}&limit=1&appid=de594cdf8e316a5e01f9bfc405afc36f`
      );

      let geoLocationData = await response.json();

      let lat = geoLocationData[0].lat;

      let lon = geoLocationData[0].lon;

      return { lat, lon };
    } catch (error) {
      console.log(error);
    }
  }

  async function getWeatherData() {
    try {
      let { lat, lon } = await getGeoLocationData();

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de594cdf8e316a5e01f9bfc405afc36f`
      );
      const weatherData = await response.json();
      console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
  }

  getWeatherData();

  app.innerHTML = `
    <h1>Welcome to the Weather App!</h1>

    <form class="form">
      <input class="input" type="text" placeholder="Enter City or Zip" />
    </form>

    <div class="weather-data">
    </div>
  `;

  return app;
}
document.body.append(App());
