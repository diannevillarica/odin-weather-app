import { get } from 'lodash';
import './sass/styles.scss';

function App() {
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
      console.log(weatherData);
      return weatherData;
    } catch (error) {
      console.log(error);
    }
  }

  // DOM STUFF
  const app = document.createElement('main');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const weather = document.createElement('div');
  const weatherMain = document.createElement('div');
  const weatherIcon = document.createElement('span');
  const weatherTemp = document.createElement('span');
  const weatherToggle = document.createElement('button');
  const weatherDesc = document.createElement('div');
  const weatherCity = document.createElement('div');
  const weatherOther = document.createElement('div');
  const weatherPrecipitation = document.createElement('span');
  const weatherHumidity = document.createElement('span');
  const weatherWind = document.createElement('span');

  button.setAttribute('type', 'submit');
  input.setAttribute('type', 'text');
  weather.setAttribute('class', 'weather');
  weatherMain.setAttribute('class', 'weather--main');
  weatherIcon.setAttribute('class', 'weather--icon');
  weatherTemp.setAttribute('class', 'weather--temp');
  weatherToggle.setAttribute('class', 'weather--toggle');
  weatherCity.setAttribute('class', 'weather--city');
  weatherDesc.setAttribute('class', 'weather--desc');
  weatherOther.setAttribute('class', 'weather--other');
  weatherPrecipitation.setAttribute('class', 'weather--precipitation');
  weatherHumidity.setAttribute('class', 'weather--humidity');
  weatherWind.setAttribute('class', 'weather--wind');

  button.textContent = 'Submit';
  weatherIcon.innerHTML = '&#9788;';
  weatherTemp.innerHTML = '66 &#8457';
  weatherToggle.textContent = 'F | C';
  weatherCity.textContent = 'Las Vegas, NV';
  weatherDesc.textContent = 'clear sky';
  weatherPrecipitation.textContent = 'Precipitation: 0%';
  weatherHumidity.textContent = 'Humidity: 28%';
  weatherWind.textContent = 'Wind: 6 mph';

  form.append(input, button);
  weatherMain.append(
    weatherIcon,
    weatherTemp,
    weatherToggle,
    weatherDesc,
    weatherCity
  );
  weatherOther.append(weatherPrecipitation, weatherHumidity, weatherWind);
  weather.append(weatherMain, weatherOther);
  app.append(form, weather);

  // trigger
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    (async () => {
      try {
        let weatherData = await getWeatherData(input.value);

        let tempF = `${Math.round(
          ((weatherData.main.temp - 273.15) * 9) / 5 + 32
        )} &#8457;`;
        let tempC = `${Math.round(weatherData.main.temp - 273.15)} &#8451;`;
        let city = weatherData.name;

        weatherTemp.innerHTML = tempF;
        weatherCity.textContent = city;
      } catch (error) {
        console.log(error);
      }
    })();
  });

  return app;
}
document.body.append(App());
