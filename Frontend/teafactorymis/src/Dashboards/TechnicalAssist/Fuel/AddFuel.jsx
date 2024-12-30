import React from 'react'
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
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";

export const AddFuel = () => {
    const [fuel_id, setFuel_id] = useState("");
  const [fuel_name, setFuel_name] = useState("");
  const [fuel_type, setFuel_type] = useState("");
  const [fuel_quantity, setFuel_quantity] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddBtn = async () => {
    if (!fuel_id || !fuel_name || !fuel_type || !fuel_quantity) {
      setError("All fields are required");
      setTimeout(() => setError(""), 2000);
    } else {
      const formData = {
        fuel_id,
        fuel_name,
        fuel_type,
        fuel_quantity,
      };
      try {
        await axios.post(`http://localhost:8080/fuel/add`, formData);
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
    setFuel_id("");
    setFuel_name("");
    setFuel_type("");
    setFuel_quantity("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Sidebar />{" "}
      <Box sx={{ bgcolor: "#d7e3fc", p: 4, borderRadius: 2 }}>
        {" "}
        <Box display="flex" alignItems="center" mb={2}>
          {" "}
          <IconButton onClick={handleBackBtn} color="primary">
            <ArrowBackIosNewIcon />{" "}
          </IconButton>{" "}
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            Add Fuel Type{" "}
          </Typography>{" "}
        </Box>{" "}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}{" "}
          </Typography>
        )}{" "}
        <form noValidate autoComplete="off">
          {" "}
          <Grid container spacing={3}>
            {" "}
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Fuel Id"
                variant="outlined"
                value={fuel_id}
                onChange={(e) => setFuel_id(e.target.value)}
              />{" "}
            </Grid>{" "}
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Fuel Name"
                variant="outlined"
                value={fuel_name}
                onChange={(e) => setFuel_name(e.target.value)}
              />{" "}
            </Grid>{" "}
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Fuel Type"
                variant="outlined"
                value={fuel_type}
                onChange={(e) => setFuel_type(e.target.value)}
              />{" "}
            </Grid>{" "}
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Fuel Quantity"
                variant="outlined"
                value={fuel_quantity}
                onChange={(e) => setFuel_quantity(e.target.value)}
              />{" "}
            </Grid>{" "}
          </Grid>{" "}
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            {" "}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackBtn}
            >
              Back{" "}
            </Button>{" "}
            <Button variant="outlined" color="warning" onClick={handleClearBtn}>
              Clear{" "}
            </Button>{" "}
            <Button variant="contained" sx={{backgroundColor:"#77DD77"}} onClick={handleAddBtn}>
              Register{" "}
            </Button>{" "}
          </Box>{" "}
        </form>{" "}
      </Box>{" "}
    </Container>
  )
}
