import React from "react";

import WeatherCard from "./components/WeatherCard/component";
import "./App.css";

function App() {
  const data = async () => {
    const resp = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0cb2fbca1e985aff5d8035ff1a5f7932"
    );
    const jsonResp = await resp.json();
    return jsonResp;
  };
  data().then((resp) => {
    console.log(resp.main.temp);
  });

  return (
    <div className="App">
      <WeatherCard temp={8} condition="Rainy" city="London" country="GB" />
    </div>
  );
}

export default App;
