import React from "react";

import WeatherCard from "./components/WeatherCard/component";
import "./App.css";

function App() {
  return (
    <div className="App">
      <WeatherCard temp={8} condition="Rainy" city="London" country="GB" />
    </div>
  );
}

export default App;
