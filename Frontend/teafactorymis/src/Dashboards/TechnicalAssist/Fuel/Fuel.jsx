import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function Fuel() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Fuel Dashboard
      </Typography>
      <Typography variant="h6">Managing fuel items in the factory</Typography>
      {/* Button Group */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          component={Link}
          to="/FuelAdd"
          variant="contained"
          color="primary"
          sx={{ py: 2, px: 4 }}
        >
          <Typography variant="h6" component="p">
            Add Fuel Type
          </Typography>
        </Button>

        <Button
          component={Link}
          to="/FuelDetails"
          variant="contained"
          color="secondary"
          sx={{ py: 2, px: 4 }}
        >
          <Typography variant="h6" component="p">
            View Fuel Types
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
