import React, { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const TechnicalDashboard = () => {
  const [counts, setCounts] = useState({
    vehicleCount: 5,
    machineTypeCount: 5,
    fuelTypeCount: 5,
  });

  // useEffect(() => {
  //   axios
  //     .get("/technical-dashboard/counts")
  //     .then((response) => {
  //       setCounts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        backgroundColor: "#f5f5f5",
        height: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginBottom: 8, marginTop: 5 }}
      >
        Technical Dashboard
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        {/* Vehicle Count Box */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#4caf50",
            color: "white",
            padding: 5,
            borderRadius: 2,
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Vehicle Count
          </Typography>
          {/* <Typography variant="h6">{counts.vehicleCount}</Typography> */}
        </Box>

        {/* Machine Type Count Box */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#4caf50",
            color: "white",
            padding: 5,
            borderRadius: 2,
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Machine Type Count
          </Typography>
          {/* <Typography variant="h6">{counts.machineTypeCount}</Typography> */}
        </Box>

        {/* Fuel Type Count Box */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#4caf50",
            color: "white",
            padding: 5,
            borderRadius: 2,
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Fuel Type Count
          </Typography>
          {/* <Typography variant="h6">{counts.fuelTypeCount}</Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default TechnicalDashboard;
