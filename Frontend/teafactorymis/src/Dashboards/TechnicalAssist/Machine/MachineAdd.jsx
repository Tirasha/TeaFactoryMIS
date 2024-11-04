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

export default function MachineAdd() {
  const [machine_id, setMachine_id] = useState("");
  const [machine_type, setMachine_type] = useState("");
  const [machine_quantity, setMachine_quantity] = useState("");
  const [machine_availability, setMachine_availability] = useState("");
  const [fuel_id, setFuel_id] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddBtn = async () => {
    if (
      !machine_id ||
      !machine_type ||
      !machine_quantity ||
      !machine_availability ||
      !fuel_id
    ) {
      setError("All fields are required");
      setTimeout(() => setError(""), 2000);
    } else {
      const formData = {
        machine_id,
        machine_type,
        machine_quantity,
        machine_availability,
        fuel_id,
      };
      try {
        await axios.post("http://localhost:8080/machine/add", formData);
        setTimeout(() => navigate("/MachineRead"), 3000);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleBackBtn = () => {
    navigate("/Machine");
  };

  const handleClearBtn = () => {
    setMachine_id("");
    setMachine_type("");
    setMachine_quantity("");
    setMachine_availability("");
    setFuel_id("");
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
            Add Machine{" "}
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
                label="Machine Id"
                variant="outlined"
                value={machine_id}
                onChange={(e) => setMachine_id(e.target.value)}
              />{" "}
            </Grid>{" "}
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Machine Type"
                variant="outlined"
                value={machine_type}
                onChange={(e) => setMachine_type(e.target.value)}
              />{" "}
            </Grid>{" "}
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Machine Quantity"
                variant="outlined"
                value={machine_quantity}
                onChange={(e) => setMachine_quantity(e.target.value)}
              />{" "}
            </Grid>{" "}
            <Grid item xs={12}>
              {" "}
              <TextField
                fullWidth
                label="Machine Availability"
                variant="outlined"
                value={machine_availability}
                onChange={(e) => setMachine_availability(e.target.value)}
              />{" "}
            </Grid>{" "}
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
            <Button variant="contained" color="primary" onClick={handleAddBtn}>
              Register{" "}
            </Button>{" "}
          </Box>{" "}
        </form>{" "}
      </Box>{" "}
    </Container>
  );
}
