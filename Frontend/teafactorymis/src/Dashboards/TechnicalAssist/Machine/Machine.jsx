import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function Machine() {
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
        Machine Dashboard
      </Typography>
      <Typography variant="h6">Managing machines in the factory</Typography>
      {/* Button Group */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          component={Link}
          to="/MachineAdd"
          variant="contained"
          color="primary"
          sx={{ py: 2, px: 4 }}
        >
          <Typography variant="h6" component="p">
            Add Machine
          </Typography>
        </Button>

        <Button
          component={Link}
          to="/MachineDetails"
          variant="contained"
          color="secondary"
          sx={{ py: 2, px: 4 }}
        >
          <Typography variant="h6" component="p">
            View Machines
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
