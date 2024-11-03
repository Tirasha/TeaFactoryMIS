import React, { useState } from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VehicleTable({ vehicle }) {

  const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState('');


  const updateVehicle = (vehicle_No) => {
    navigate(`/Vehicle/updateVehicle/${vehicle_No}`);
  };

  const handleDelete = (vehicle_No) => {
    if (window.confirm("Are you sure you want to delete this Vehicle?")) {
      axios.delete(`http://localhost:8080/vehicle/delete/${vehicle_No}`)
        .then((response) => {
          if (response.status === 202) {
            alert("Deleted successfully.");
          } else {
            throw new Error("Failed to Delete Vehicle.");
          }
        })
        .catch((error) => {
          console.error("Error Deleting Vehicle", error.message);
        });
      window.location.reload();
    }
  };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredVehicles = vehicle.filter(vehicle => vehicle.vehicle_no.includes(searchQuery));

  return (
    <div>

      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '1rem' }}>
        <Button variant="contained" style={{fontWeight:"bold"}} onClick={() => { navigate('/vehicle/addVehicle') }} >Add new Employee</Button>

        {/* <TextField
          label="Search by Vehicle No"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size='small'
        /> */}
      </Grid>

      <TableContainer component={Paper} container justifyContent="space-between" style={{ marginBottom: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle No</TableCell>
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Vehicle Image</TableCell>
              <TableCell>Vehicle Availability</TableCell>
              <TableCell>Fuel Id</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => */}
            {(
                <TableRow key={vehicle.vehicle_No}>
                  <TableCell>{vehicle.vehicle_type}</TableCell>
                  <TableCell>{vehicle.vehicle_image}</TableCell>
                  <TableCell>{vehicle.vehicle_availability}</TableCell>
                  <TableCell>{vehicle.fuel_id}</TableCell>
                  <TableCell>
                    <Button size='small' color="primary" variant='outlined' sx={{fontWeight:"bold"}} onClick={() => updateVehicle(vehicle.vehicle_No)}>
                      Update
                    </Button>
                    <Button size='small' color="error" variant='outlined' sx={{fontWeight:"bold"}} onClick={() => handleDelete(vehicle.vehicle_No)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            //   {/* )
            // ) :  */}
            (
              <TableRow>
                <TableCell colSpan={14} align="center">
                  No Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default VehicleTable;
