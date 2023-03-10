import './stylesheets/styles.scss';

function App() {
  const app = document.createElement('div');

  async function getWeatherData() {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&appid=de594cdf8e316a5e01f9bfc405afc36f'
      );
      const weatherData = response.json();
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
