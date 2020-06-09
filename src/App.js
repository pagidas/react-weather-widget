import React from "react";

import "./App.css";
import WeatherEngine from "./components/WeatherCardEngine";

function App() {
  return (
    <div className="App">
      <WeatherEngine location="london, gb" />
    </div>
  );
}

export default App;
