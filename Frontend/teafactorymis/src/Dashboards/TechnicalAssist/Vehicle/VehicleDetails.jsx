// import React, { useState, useEffect } from "react";
// import Sidebar from "../../Component/Sidebar";
// import axios from "axios";
// import {
//   Button,
//   Box,
//   Typography,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function VehicleDetails() {
//   const navigate = useNavigate();
//   const [tableData, setTableData] = useState([]);
//   const [deleteVehicle, setDeleteVehicle] = useState(false);
//   const [modelView, setModelView] = useState(false);
//   const [vehicle_No, setVehicle_No] = useState("");
//   const [vehicle_type, setVehicle_type] = useState("");
//   const [vehicle_image, setVehicle_image] = useState("");
//   const [vehicle_availability, setVehicle_availability] = useState("");
//   const [fuel_id, setFuel_id] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/vehicle/view")
//       .then((res) => setTableData(res.data.content))
//       .catch((err) => alert(err.message));
//   }, [deleteVehicle]);

//   const handleDeleteBtn = async (vehicle_No) => {
//     await axios
//       .delete(`http://localhost:8080/vehicle/delete/${vehicle_No}`)
//       .then(() => {
//         setDeleteVehicle((prev) => !prev);
//         alert("Delete Successfully");
//       })
//       .catch((err) => alert(err.message));
//   };

//   const handleEditBtn = async (vehicle_No) => {
//     await axios
//       .get(`http://localhost:8080/vehicle/search/${vehicle_No}`)
//       .then((res) => {
//         const data = res.data.content;
//         setVehicle_No(data.vehicle_No);
//         setVehicle_type(data.vehicle_type);
//         setVehicle_image(data.vehicle_image);
//         setVehicle_availability(data.vehicle_availability);
//         setFuel_id(data.fuel_id);
//         setModelView(true);
//       })
//       .catch((err) => alert(err.message));
//   };

//   const handleUpdateBtn = async () => {
//     const updateData = {
//         vehicle_No,
//         vehicle_type,
//         vehicle_image,
//         vehicle_availability,
//         fuel_id,
//     };

//     await axios
//       .put("http://localhost:8080/vehicle/update", updateData)
//       .then(() => window.location.href = "/VehicleDetails")
//       .catch((err) => alert(err.message));
//   };

//   return (
//     <Box display="flex" flexDirection="column" p={3}>
//       <Sidebar />
//       <Box display="flex" alignItems="center" mb={3}>
//         <IconButton onClick={() => navigate("/vehicle")}>
//           <ArrowBackIosNewIcon />
//         </IconButton>
//         <Typography variant="h4" fontWeight="bold">
//           Vehicle Details
//         </Typography>
//       </Box>

//       {modelView ? (
//         <Box component="form" mb={4} p={3} bgcolor="#f5f5f5" borderRadius={2}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Vehicle No"
//                 value={vehicle_No}
//                 fullWidth
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Vehicle Type"
//                 value={vehicle_type}
//                 onChange={(e) => setVehicle_type(e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Vehicle Image"
//                 value={vehicle_image}
//                 onChange={(e) => setVehicle_image(e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Vehicle Availability"
//                 value={vehicle_availability}
//                 onChange={(e) => setVehicle_availability(e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Fuel Id"
//                 value={fuel_id}
//                 onChange={(e) => setFuel_id(e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//           <Box mt={3}>
//             <Button variant="contained" onClick={handleUpdateBtn} sx={{ mr: 2 }}>
//               Update
//             </Button>
//             <Button variant="outlined" onClick={() => setModelView(false)}>
//               Close
//             </Button>
//           </Box>
//         </Box>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>No</TableCell>
//                 <TableCell>Vehicle No</TableCell>
//                 <TableCell>Vehicle Type</TableCell>
//                 <TableCell>Vehicle Image</TableCell>
//                 <TableCell>Vehicle Availability</TableCell>
//                 <TableCell>Fuel Id</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.map((data, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{data.vehicle_No}</TableCell>
//                   <TableCell>{data.vehicle_type}</TableCell>
//                   <TableCell>{data.vehicle_image}</TableCell>
//                   <TableCell>{data.vehicle_availability}</TableCell>
//                   <TableCell>{data.fuel_id}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleEditBtn(data.vehicle_No)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleDeleteBtn(data.vehicle_No)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }
