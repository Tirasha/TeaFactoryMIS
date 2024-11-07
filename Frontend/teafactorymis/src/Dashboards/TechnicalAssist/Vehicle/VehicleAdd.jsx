import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Component/Sidebar";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Input,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";

export default function VehicleAdd() {
  const [vehicle_No, setVehicle_No] = useState("");
  const [vehicle_type, setVehicle_type] = useState("");
  // const [vehicle_image, setVehicle_image] = useState("");
  const [vehicle_availability, setVehicle_availability] = useState("");
  const [fuel_id, setFuel_id] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setVehicle_image(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleAddBtn = async () => {
    if (
      !vehicle_No ||
      !vehicle_type ||
      // !vehicle_image ||
      !vehicle_availability ||
      !fuel_id
    ) {
      setError("All fields are required");
      setTimeout(() => setError(""), 2000);
    } else {
      const formData = {
        vehicle_No,
        vehicle_type,
        // vehicle_image,
        vehicle_availability,
        fuel_id,
      };
      try {
        await axios.post(`http://localhost:8080/vehicle/add`, formData);
        setTimeout(() => navigate("/TechnicalDashboard"), 3000);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleBackBtn = () => {
    navigate("/TechnicalDashboard");
  };

  const handleClearBtn = () => {
    setVehicle_No("");
    setVehicle_type("");
    // setVehicle_image("");
    setVehicle_availability("");
    setFuel_id("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Sidebar />
      <Box sx={{ bgcolor: "#d7e3fc", p: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={handleBackBtn} color="primary">
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            Add Vehicle
          </Typography>
        </Box>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vehicle No"
                variant="outlined"
                value={vehicle_No}
                onChange={(e) => setVehicle_No(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vehicle Type"
                variant="outlined"
                value={vehicle_type}
                onChange={(e) => setVehicle_type(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ color: "grey.700" }}>
                  Vehicle Image
                </Typography>
                <Input
                  type="file"
                  onChange={handleImageChange}
                  inputProps={{ accept: "image/png, image/jpeg" }}
                  fullWidth
                />
              {vehicle_image && (
                <img
                  src={vehicle_image}
                  alt="Vehicle"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )}
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vehicle Availability"
                variant="outlined"
                value={vehicle_availability}
                onChange={(e) => setVehicle_availability(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fuel Id"
                variant="outlined"
                value={fuel_id}
                onChange={(e) => setFuel_id(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackBtn}
            >
              Back
            </Button>
            <Button variant="outlined" color="warning" onClick={handleClearBtn}>
              Clear
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddBtn}>
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
