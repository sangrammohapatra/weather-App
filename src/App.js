import "./App.css";
import Home from "./Components/Home";
import { weatherDataFinder } from "./Assets/ApiCalls";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [mySavedLocations, setMySavedLocations] = useState(
    JSON.parse(localStorage.getItem("savedLocations")) || []
  );

  const getLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const data = await weatherDataFinder(
          position.coords.latitude,
          position.coords.longitude
        );
        setWeatherData(data);
      } catch (error) {
        console.error("Error getting your location or weather data:", error);
      }
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (!navigator.permissions) {
      getLocation();
    } else {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            getLocation();
          } else if (permissionStatus.state === "prompt") {
            permissionStatus.onchange = () => {
              getLocation();
            };
          }
        });
    }

    window.onbeforeunload = () => {
      localStorage.removeItem("savedLocations");
    };
  }, []);

  return (
    <Box className="main">
      <Home
        weatherDataFinder={weatherDataFinder}
        mySavedLocations={mySavedLocations}
        setMySavedLocations={setMySavedLocations}
        weatherData={weatherData}
      />
    </Box>
  );
}

export default App;
