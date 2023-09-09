import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { TiWeatherCloudy } from "react-icons/ti";
import CurLocWeather from "./CurLocWeather";
import SavedLocations from "./SavedLocations";
import { geoCodeFinder } from "../Assets/ApiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBackdrop from "./Backdrop";

const Home = ({ weatherData, setMySavedLocations, mySavedLocations }) => {
  const [locValue, setLocValue] = useState("");
  const [data, setData] = useState(weatherData);
  const [isLoading, setIsLoading] = useState(false);

  const notify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const locationWeatherHandler = async (value) => {
    setIsLoading(true);
    if (value === "") {
      const message = "Please enter a valid location !!!";
      notify(message);
      setIsLoading(false);
    } else {
      const searchedWeatherData = await geoCodeFinder(value);
      if (searchedWeatherData === null) {
        const message =
          "Error fetching weather data. Please try again with a valid location.";
        notify(message);
        setIsLoading(false);
      } else {
        setLocValue("");
        setData(searchedWeatherData);
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      locationWeatherHandler(locValue);
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
          }}
        >
          <TextField
            placeholder="Location"
            variant="outlined"
            value={locValue}
            onChange={(e) => {
              setLocValue(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                height: "45px",
                borderRadius: "20px",
                padding: "10px",
                "&.MuiInputBase-input": {
                  padding: "10px",
                },
              },
            }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Button
            variant="contained"
            onClick={() => {
              locationWeatherHandler(locValue);
            }}
            sx={{
              height: "35px",
              borderRadius: "17px",
              gap: "5px",
            }}
          >
            Search
            <span>
              <TiWeatherCloudy />
            </span>
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: "50px", marginLeft: "20px", marginRight: "20px" }}>
        <Grid container spacing={2}>
          <Grid item md={9}>
            <Box sx={{ height: "100%" }}>
              {isLoading ? (
                <SimpleBackdrop />
              ) : (
                <CurLocWeather
                  data={data}
                  mySavedLocations={mySavedLocations}
                  setMySavedLocations={setMySavedLocations}
                />
              )}
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box sx={{ height: "100%" }}>
              <SavedLocations
                mySavedLocations={mySavedLocations}
                setMySavedLocations={setMySavedLocations}
                locationWeatherHandler={locationWeatherHandler}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
