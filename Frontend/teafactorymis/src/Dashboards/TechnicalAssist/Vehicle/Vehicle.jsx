// import React, { useEffect, useState } from "react";
// import {Box, Typography} from "@mui/material";
// // import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../../Component/Sidebar";
// import Grid from "@mui/material/Grid";
// import VehicleTable from "../../../Component/Vehicle/VehicleTable";
// // import EmployeeCard from "../../components/Vehicle/EmployeeCard";
// import axios from "axios";

// export default function Vehicle() {
//   const [vehicle, setVehicle] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/vehicle/view")
//       .then((response) => {
//         const { data } = response;
//         if (data && data.content) {
//           setVehicle(data.content);
//         } else {
//           console.error("Invalid response format:", data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching vehicles:", error);
//       });
//   }, []);

//   return (
//     <>
//       {/* <Navbar /> */}
//       <Box height={60} />
//       <Box sx={{ display: "flex" }}>
//         <Sidebar />

//         {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <h1>Vehicle</h1> */}

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             p: 3,
//             backgroundColor: "#f5f5f5",
//             height: "100vh",
//           }}
//         >
//           <Typography variant="h4" gutterBottom>
//             Technical Dashboard
//           </Typography>
//           <Typography variant="h6"></Typography>
//           {/* Cards */}
//           {/* <Grid container spacing={2}>
//             <EmployeeCard title="Total Employees" value={employees.length} /> */}
//           {/* <EmployeeCard title="Present Employees" value={0} />
//             <EmployeeCard title="Absant Employees" value={0} />
//             <EmployeeCard title="Resigned Employees" value={0} /> */}
//           {/* </Grid> */}

//           <Box height={30} />

//           <VehicleTable vehicle={vehicle} />
//         </Box>
//       </Box>
//     </>
//   );
// }



import React from "react";
// import CustomerHomeImage from "../../Images/CustomerHome.jpg";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function Vehicle() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        // backgroundImage: `url(${CustomerHomeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Button Group */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          component={Link}
          to="/VehicleAdd"
          variant="contained"
          color="primary"
          sx={{ py: 2, px: 4 }}
        >
          <Typography variant="h6" component="p">
            Add Vehicle
          </Typography>
        </Button>

        <Button
          component={Link}
          to="/VehicleView"
          variant="contained"
          color="secondary"
          sx={{ py: 2, px: 4 }}
        >
          <Typography variant="h6" component="p">
            View Vehicles
          </Typography>
        </Button>

        {/* <Button
          component={Link}
          to="/customerstatus"
          variant="contained"
          color="success"
          sx={{ py: 2, px: 4 }}
        >
          <Typography variant="h6" component="p">
            Customer Status
          </Typography>
        </Button> */}
      </Box>
    </Box>
  );
}
