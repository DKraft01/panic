import "./App.css";
import React, { useState } from "react";
import Safe from "./safe";
import Danger from "./danger";

function App(props) {
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setUserLocation({ latitude, longitude });
    });
  };
  getUserLocation();
  if (props.data && userLocation != null) {
    return (
      <Danger
        lati={userLocation.latitude}
        longi={userLocation.longitude}
      ></Danger>
    );
  } else {
    return <Safe></Safe>;
  }
}

export default App;
