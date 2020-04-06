import React, { useState, useEffect } from "react";

import WeatherCard from "./components/WeatherCard/component";
import "./App.css";

function App() {
  const [query, setQuery] = useState("London, gb");
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  const data = async (q) => {
    const resp = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=0cb2fbca1e985aff5d8035ff1a5f7932`
    );
    const jsonResp = await resp.json();
    return jsonResp;
  };

  const handlerSearch = (e) => {
    e.preventDefault();
    data(query).then((resp) => {
      setWeather({
        temp: resp.main.temp,
        city: resp.name,
        condition: resp.weather[0].main,
        country: resp.sys.country,
      });
    });
  };

  useEffect(() => {
    data(query).then((resp) => {
      setWeather({
        temp: resp.main.temp,
        city: resp.name,
        condition: resp.weather[0].main,
        country: resp.sys.country,
      });
    });
  }, []);

  return (
    <div className="App">
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
}

export default App;
