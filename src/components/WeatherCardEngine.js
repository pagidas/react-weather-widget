import React, { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard/component";

const WeatherEngine = () => {
  const location = "Sydney, AU";
  // Init for our state variables
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  // Defines the data fetching function
  const getWeather = async (q) => {
    const resp = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=0cb2fbca1e985aff5d8035ff1a5f7932`
    );
    const jsonResp = await resp.json();
    setWeather({
      temp: jsonResp.main.temp,
      city: jsonResp.name,
      condition: jsonResp.weather[0].main,
      country: jsonResp.sys.country,
    });
  };
  // Function to handle search queries from the user side
  const handlerSearch = (e) => {
    e.preventDefault();
    getWeather(query);
  };

  // This hook will make the code run only once then component is mounted and never again
  useEffect(() => {
    getWeather(location);
  }, [location]);
  return (
    <div>
      <WeatherCard
        temp={weather.temp}
        condition={weather.condition}
        city={weather.city}
        country={weather.country}
      />
      <form>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button onClick={(e) => handlerSearch(e)}>Search</button>
      </form>
    </div>
  );
};

export default WeatherEngine;
