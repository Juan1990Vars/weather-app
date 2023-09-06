import { useState } from "react";

const WeatherCard = ({ weather, temp }) => {
  console.log(weather);

  const [isCelsius, setIsCelsius] = useState(true)

  const handleChangeTemp = () => setIsCelsius(!isCelsius)

  return (
    <article className="container__box">
      <h1 className="container__title">Weather App</h1>
      <h2 className="container__weather">
        {weather?.name}, {weather?.sys.country}
      </h2>
      <div className="container__gral">
        <div className="container__climate">
          {/* Dentro del img tengo mi imagen de la nube */}
          <img
            src={
              weather &&
              `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
            }
            alt=""
          />
        </div>
        <section>
          <h3>"{weather?.weather[0].description}"</h3>
          <ul className="container__clouds">
            <li>
              <span>Wind Speed: </span>
              <span>{weather?.wind.speed} m/s</span>
            </li>
            <li>
              <span>Clouds: </span>
              <span>{weather?.clouds.all} %</span>
            </li>
            <li>
              <span>Pressure: </span>
              <span>{weather?.main.pressure} hpa</span>
            </li>
          </ul>
        </section>
      </div>
      <h2>{isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F`}</h2>
      <button className="container__btn" onClick={handleChangeTemp}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
    </article>
  );
};

export default WeatherCard;
