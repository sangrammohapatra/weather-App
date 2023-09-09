const apiKey = process.env.REACT_APP_API_KEY;

export const dirGeoApi = (location) => {
  const api = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;
  return api;
};
export const revGeoApi = (lat, long) => {
  const api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`;
  return api;
};
export const weatherApi = (lat, long) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  return api;
};
