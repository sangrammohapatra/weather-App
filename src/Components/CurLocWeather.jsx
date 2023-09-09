import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Icon } from "../Assets/graphics";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CurLocWeather = ({ setMySavedLocations, mySavedLocations, data }) => {
  if (!data) {
    return (
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
          borderRadius: "15px",
          color: "white",
          textAlign: "center",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Weather data not available.
        </Typography>
        <Typography paragraph gutterBottom>
          Please allow loaction permission to see your current location weather
          details or search a location to see it's weather details.
        </Typography>
      </Box>
    );
  }

  const date = new Date(data.dt * 1000);
  const formattedDate = `${date.getHours()}:${date.getMinutes()}    ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const CondIcon = Icon(data.weather[0].main);
  const saveFavHandler = () => {
    const savedLocations = localStorage.getItem("savedLocations");
    if (!savedLocations || !JSON.parse(savedLocations).includes(data.name)) {
      setMySavedLocations((prevSavedLocations) => [
        ...prevSavedLocations,
        data.name,
      ]);

      localStorage.setItem(
        "savedLocations",
        JSON.stringify([...mySavedLocations, data.name])
      );
    } else {
      toast.error(`${data.name} is already in Favourites.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Box
      sx={{
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
        borderRadius: "15px",
        color: "white",
        textAlign: "center",
        paddingBottom: "20px",
        paddingTop: "20px",
      }}
    >
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {data.name}, {data.sys.country}
          </Typography>
          <Button onClick={saveFavHandler}>
            <AddIcon />
            Favourites
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            margin: "20px",
            justifyContent: "center",
          }}
        >
          <Typography variant="h1">{data.main.temp} °</Typography>
          <Typography
            variant="h2"
            sx={{
              paddingTop: "7px",
            }}
          >
            C
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            margin: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{data.weather[0].main}</Typography>
          <span>{CondIcon}</span>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            margin: "20px",
            justifyContent: "center",
          }}
        >
          <Typography variant="p">{`Feels Like : ${data.main.feels_like}°`}</Typography>
          <Typography variant="p">{`Min Temp : ${data.main.temp_min}°`}</Typography>
          <Typography variant="p">{`Max Temp : ${data.main.temp_max}°`}</Typography>
          <Typography variant="p">{`Humidity : ${data.main.humidity}°`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            margin: "20px",
            justifyContent: "center",
          }}
        >
          <Typography variant="p">{`Visibility : ${data.visibility} m`}</Typography>
          <Typography variant="p">{`Wind Speed : ${data.wind.speed} m/s`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            margin: "20px",
            justifyContent: "center",
          }}
        >
          <Typography variant="p">{`Updated as of : ${formattedDate}`}</Typography>
        </Box>
      </div>
      <div>{Icon()}</div>
    </Box>
  );
};

export default CurLocWeather;
