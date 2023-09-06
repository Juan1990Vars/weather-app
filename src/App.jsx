import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [Weather, setWeather] = useState();
  const [temp, setTemp] = useState();

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        // Guardar objeto latitud y longitud
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };

    //Me permite entrar a las coordenadas
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  //Se ejecuta en el nacimiento del componente y cambio de coords
  // If solo se ejecuta cuando coords tiene la informacion - dependa de coords
  useEffect(() => {
    if (coords) {
      const apikey = `35362cd86bf9c619a3f9c42ef1c717bc`;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apikey}`;
      axios
        .get(url)
        // res es la respuesta transformada ya en json
        .then((res) => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: (((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(1),
          }; // se guarda la temperatura
          setTemp(obj);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  console.log(Weather);

  const imgStyle = {
    backgroundImage: `url(/clima.jpg)`
  }

  return (
    <div className="container" style={imgStyle}>
      <WeatherCard weather={Weather} 
       temp = {temp}
      />
      
    </div>
  );
}

export default App;
