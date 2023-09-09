import axios from "axios";
import { dirGeoApi, weatherApi } from "./apiHub";

export const geoCodeFinder = async (location) => {
  try {
    const data = await axios.get(dirGeoApi(location));
    const weatherData = await weatherDataFinder(
      data.data[0].lat,
      data.data[0].lon
    );
    return weatherData;
  } catch (error) {
    console.log("Error fetching geo code:", error);
    return null;
  }
};

export const weatherDataFinder = async (lat, long) => {
  try {
    const data = await axios.get(weatherApi(lat, long));
    return data.data;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    return null;
  }
};
