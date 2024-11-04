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

export default function FuelDetails() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [deleteFuel, setDeleteFuel] = useState(false);
  const [modelView, setModelView] = useState(false);
  const [fuel_id, setFuel_id] = useState("");
  const [fuel_name, setFuel_name] = useState("");
  const [fuel_type, setFuel_type] = useState("");
  const [fuel_quantity, setFuel_quantity] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/fuel/view")
      .then((res) => setTableData(res.data.content))
      .catch((err) => alert(err.message));
  }, [deleteFuel]);

  const handleDeleteBtn = async (fuel_id) => {
    await axios
      .delete(`http://localhost:8080/fuel/delete/${fuel_id}`)
      .then(() => {
        setDeleteFuel((prev) => !prev);
        alert("Delete Successfully");
      })
      .catch((err) => alert(err.message));
  };

  const handleEditBtn = async (fuel_id) => {
    await axios
      .get(`http://localhost:8080/fuel/search/${fuel_id}`)
      .then((res) => {
        const data = res.data.content;
        setFuel_id(data.fuel_id);
        setFuel_name(data.fuel_name);
        setFuel_type(data.fuel_type);
        setFuel_quantity(data.fuel_quantity);
        setModelView(true);
      })
      .catch((err) => alert(err.message));
  };

  const handleUpdateBtn = async () => {
    const updateData = {
      fuel_id,
      fuel_name,
      fuel_type,
      fuel_quantity,
    };

    await axios
      .put("http://localhost:8080/fuel/update", updateData)
      .then(() => (window.location.href = "/FuelDetails"))
      .catch((err) => alert(err.message));
  };

  return (
    <Box display="flex" flexDirection="column" p={3}>
      <Sidebar />
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate("/Fuel")}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          Fuel Type Details
        </Typography>
      </Box>

      {modelView ? (
        <Box component="form" mb={4} p={3} bgcolor="#f5f5f5" borderRadius={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Fuel Id" value={fuel_id} fullWidth disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fuel Name"
                value={fuel_name}
                onChange={(e) => setFuel_name(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fuel Type"
                value={fuel_type}
                onChange={(e) => setFuel_type(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fuel Quantity"
                value={fuel_quantity}
                onChange={(e) => setFuel_quantity(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button
              variant="contained"
              onClick={handleUpdateBtn}
              sx={{ mr: 2 }}
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
                <TableCell>Fuel Id</TableCell>
                <TableCell>Fuel Name</TableCell>
                <TableCell>Fuel Type</TableCell>
                <TableCell>Fuel Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data.fuel_id}</TableCell>
                  <TableCell>{data.fuel_name}</TableCell>
                  <TableCell>{data.fuel_type}</TableCell>
                  <TableCell>{data.fuel_quantity}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditBtn(data.fuel_id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteBtn(data.fuel_id)}>
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
