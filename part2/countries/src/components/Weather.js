import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ countryCapital }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const compassDirection = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const [weather, setWeather] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  console.log("rendering Weather");

  if (error) {
    return <div>data for {countryCapital} not found</div>;
  }

  return (
    <div>
      <div>
        <strong>temperature:</strong>{" "}
        {weather && `${weather.main.temp} deg celsius`}
      </div>
      {weather && (
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather-icon"
        />
      )}
      <div>
        <strong>wind:</strong>{" "}
        {weather &&
          `${weather.wind.speed} meter/sec direction ${
            compassDirection[
              Math.floor(((weather.wind.deg + 360 / 16 / 2) % 360) / (360 / 16))
            ]
          }`}
      </div>
    </div>
  );
};

export default Weather;
