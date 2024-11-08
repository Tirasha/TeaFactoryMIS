import React, { useState, useEffect } from "react";
import Sidebar from "../../../Component/Sidebar";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MachineDetails() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [deleteMachine, setDeleteMachine] = useState(false);
  const [modelView, setModelView] = useState(false);
  const [machine_id, setMachine_id] = useState("");
  const [machine_type, setMachine_type] = useState("");
  const [machine_quantity, setMachine_quantity] = useState("");
  const [machine_availability, setMachine_availability] = useState("");
  const [fuel_id, setFuel_id] = useState("");
  const [fuel_name, setFuel_name] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/machine/view`)
      .then((res) => setTableData(res.data.content))
      .catch((err) => alert(err.message));
  }, [deleteMachine]);

  const handleDeleteBtn = async (machine_id) => {
    await axios
      .delete(`http://localhost:8080/machine/delete/${machine_id}`)
      .then(() => {
        setDeleteMachine((prev) => !prev);
        alert("Delete Successfully");
      })
      .catch((err) => alert(err.message));
  };

  const handleEditBtn = async (machine_id) => {
    await axios
      .get(`http://localhost:8080/machine/search/${machine_id}`)
      .then((res) => {
        const data = res.data.content;
        setMachine_id(data.machine_id);
        setMachine_type(data.machine_type);
        setMachine_quantity(data.machine_quantity);
        setMachine_availability(data.machine_availability);
        setFuel_name(data.fuel_name);
        setModelView(true);
      })
      .catch((err) => alert(err.message));
  };

  const handleUpdateBtn = async () => {
    const updateData = {
      machine_id,
      machine_type,
      machine_quantity,
      machine_availability,
      fuel_id,
    };

    await axios
      .put(`http://localhost:8080/machine/update`, updateData)
      .then(() => (window.location.href = "/TechnicalDashboard"))
      .catch((err) => alert(err.message));
  };

  return (
    <Box display="flex" flexDirection="column" p={3}>
      <Sidebar />
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate("/TechnicalDashboard")}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          Machine Details
        </Typography>
      </Box>

      {modelView ? (
        <Box component="form" mb={4} p={3} bgcolor="#f5f5f5" borderRadius={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Machine Id"
                value={machine_id}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Machine Type"
                value={machine_type}
                onChange={(e) => setMachine_type(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Machine Quantity"
                value={machine_quantity}
                onChange={(e) => setMachine_quantity(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Machine Availability"
                value={machine_availability}
                onChange={(e) => setMachine_availability(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fuel Id"
                value={fuel_id}
                onChange={(e) => setFuel_id(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button
              variant="contained"
              onClick={handleUpdateBtn}
              sx={{backgroundColor:"#77DD77"}}
            >
              Update
            </Button>
            <Button variant="outlined" onClick={() => setModelView(false)}>
              Close
            </Button>
          </Box>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Machine Id</TableCell>
                <TableCell>Machine Type</TableCell>
                <TableCell>Machine Quantity</TableCell>
                <TableCell>Machine Availability</TableCell>
                <TableCell>Fuel Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data.machine_id}</TableCell>
                  <TableCell>{data.machine_type}</TableCell>
                  <TableCell>{data.machine_quantity}</TableCell>
                  <TableCell>{data.machine_availability}</TableCell>
                  <TableCell>{data.fuel_name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditBtn(data.machine_id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteBtn(data.machine_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
