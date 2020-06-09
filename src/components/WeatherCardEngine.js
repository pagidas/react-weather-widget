import React, { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  // Init for our state variables
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  // Defines the data fetching function
  const getWeather = async (q) => {
    setQuery("");
    setLoading(true);
    try {
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
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  // Function to handle search queries from the user side
  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(query);
  };

  // This hook will make the code run only once then component is mounted and never again
  useEffect(() => {
    getWeather(location);
  }, [location]);
  return (
    <div>
      {!loading && !error ? (
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
            <button onClick={(e) => handleSearch(e)}>Search</button>
          </form>
        </div>
      ) : loading ? (
        <div style={{ color: "black" }}>Loading</div>
      ) : !loading && error ? (
        <div style={{ color: "black" }}>
          There has been an error!
          <br />
          <button onClick={() => setError(false)}>Reset!</button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;
