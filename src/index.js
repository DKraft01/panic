import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDrIZj0apEras6WLg2NEl5T2JtwNimHF5Y",
//   authDomain: "test-react-realtime-81fc7.firebaseapp.com",
//   databaseURL: "https://test-react-realtime-81fc7-default-rtdb.firebaseio.com",
//   projectId: "test-react-realtime-81fc7",
//   storageBucket: "test-react-realtime-81fc7.appspot.com",
//   messagingSenderId: "505385638137",
//   appId: "1:505385638137:web:0a2cd6fd4eaf64aa9caa28",
//   measurementId: "G-CYZDXHCSNZ",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCyXb1cdSFof6_9t7aufjssaRdsqqDW9LI",
  authDomain: "emergency-button-171a2.firebaseapp.com",
  databaseURL: "https://emergency-button-171a2-default-rtdb.firebaseio.com",
  projectId: "emergency-button-171a2",
  storageBucket: "emergency-button-171a2.appspot.com",
  messagingSenderId: "97430311675",
  appId: "1:97430311675:web:ad22d2317549d117cc965e",
  measurementId: "G-5YELF547DV",
};

export const app = initializeApp(firebaseConfig);
const db = getDatabase();
export let data;

function writeUserData(userId, state) {
  const db = getDatabase();
  const reference = ref(db, "geo/" + userId);

  set(reference, {
    geoloca: state,
  });
}

// function writeUserData(userId, state) {
//   const db = getDatabase();
//   const reference = ref(db, "users/" + userId);

//   set(reference, {
//     mode: state,
//   });
// }
// writeUserData("estado", true);

// onValue(
//   ref(db, "users/estado/mode"),
//   (snapshot) => ((data = snapshot.val()), console.log(data))
// );

function Firebase() {
  const [Dato, setDato] = useState();
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setUserLocation({ latitude, longitude });
    });
  };
  getUserLocation();

  if (Dato && userLocation != null) {
    writeUserData("location", {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
  }
  useEffect(() => {
    const query = ref(db, "EmergencyButton/emergencyStatus1/status");
    return onValue(query, (snapshot) => {
      setDato(snapshot.val());
      console.log(Dato);
    });
  }, [Dato]);

  return <App data={Dato} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Firebase></Firebase>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
