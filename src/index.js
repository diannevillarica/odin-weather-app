import { get } from 'lodash';
import './stylesheets/styles.scss';

function App() {
  const app = document.createElement('div');

  async function getLocationData(value) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=de594cdf8e316a5e01f9bfc405afc36f`
      );

      let geoLocationData = await response.json();
      let { lat, lon } = geoLocationData[0];

      return { lat, lon };
    } catch (error) {
      console.log(error);
    }
  }

  async function getWeatherData(value) {
    try {
      let { lat, lon } = await getLocationData(value);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de594cdf8e316a5e01f9bfc405afc36f`
      );
      const weatherData = await response.json();
      // console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
  }

  // DOM STUFF

  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('input');

  button.setAttribute('type', 'submit');
  button.textContent = 'Submit';

  input.setAttribute('type', 'text');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(input.value);
    getWeatherData(input.value);
  });

  form.append(input, button);
  app.append(form);

  return app;
}
document.body.append(App());
