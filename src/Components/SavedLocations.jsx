import { Box, Chip, ListItem, Typography } from "@mui/material";

const SavedLocations = ({
  mySavedLocations,
  setMySavedLocations,
  locationWeatherHandler,
}) => {
  const savedLocationHandler = async (location) => {
    locationWeatherHandler(location);
  };
  const deleteLocHandler = (index) => {
    const updatedLocs = [...mySavedLocations];
    updatedLocs.splice(index, 1);
    setMySavedLocations(updatedLocs);

    localStorage.setItem("savedLocations", JSON.stringify(updatedLocs));
  };

  return (
    <Box
      sx={{
        display: "block",
        borderRadius: 5,
        justifyContent: "center",
        padding: "10px",
        margin: "10px",
        gap: "20px",
        background: "rgba(255, 255, 255, 0.3)",
      }}
    >
      <Box
        sx={{
          borderRadius: 5,
          padding: "7px",
          margin: "8px",
          background: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontWeight: 700,
          }}
        >
          Favourites
        </Typography>
      </Box>
      {mySavedLocations.length === 0 ? (
        <Box
          sx={{
            borderRadius: 5,
            padding: "7px",
            margin: "8px",
            background: "rgba(255, 0, 0, 0.3)",
          }}
        >
          <Typography sx={{ color: "#fff" }}>
            Oops ! Looks like you do not have any favourite
            Locations....&#x1f646;&#x200d;&#x2642;&#xfe0f;
          </Typography>
        </Box>
      ) : (
        <Box>
          {mySavedLocations.map((item, index) => (
            <ListItem key={index}>
              <Chip
                variant="outlined"
                onClick={() => {
                  savedLocationHandler(item);
                }}
                label={`${index + 1} . ${item}`}
                onDelete={() => {
                  deleteLocHandler(index);
                }}
              />
            </ListItem>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SavedLocations;
