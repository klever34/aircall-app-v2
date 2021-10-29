import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ActivityIndicator = () => {
  return (
    <Box sx={{ display: "flex", height: 20, width: 20 }}>
      <CircularProgress />
    </Box>
  );
};

export default ActivityIndicator;
