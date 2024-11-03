import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VehicleForm({
  apiMethod,
  submitBtnName,
  resetBtnName,
  defaultFieldValues,
}) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    vehicle_No: "",
    vehicle_type: "",
    vehicle_image: "",
    vehicle_availability: "--Select the Availability--",
    fuel_id: "",
  });

  const [formErrors, setFormErrors] = useState({
    vehicle_No: "",
    vehicle_type: "",
    vehicle_image: "",
    vehicle_availability: "",
    fuel_id: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [salaryParams, setSalaryParams] = useState([]);
  const [submitBtnActiveState, setSubmitBtnActiveState] = useState(false);

  // useEffect(() => {
  //     axios.get('http://localhost:8080/salary-params/view')
  //         .then((response) => {
  //             if (response.data.code === "00") {
  //                 //Successfully fetched all Salary Parameters
  //                 // console.log(response.data);
  //                 setSalaryParams(response.data.content)
  //             } else if (response.data.code === "01") {
  //                 //No records of Salary Parameters
  //                 alert("No added positions for employees");
  //                 // navigate("/employees");
  //                 setSubmitBtnActiveState(true);
  //             }
  //         }).catch((error) => {
  //             console.error("Error Fetching data:", error);
  //             alert("Error Fetching data: " + error.message);
  //             // navigate("/employees");
  //             setSubmitBtnActiveState(true);
  //         });
  //     if (defaultFieldValues) {
  //         setFormValues(defaultFieldValues);
  //     }
  // }, [defaultFieldValues]);

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "Field is required";
    } else if (value.trim() !== value) {
      error = "Begin and end with white spaces are not allowed";
    } else {
      if (name === "vehicle_No") {
        if (!/^VH\d+$/.test(value)) {
          error = "Enter Correct Vehicle No (VHXXX)";
        }
      } else if (name === "vehicle_type") {
        if (!/^[a-zA-Z\s.]+$/.test(value)) {
          error = "Only letters, dots, and spaces between letters are allowed";
        }
      } else if (name === "vehicle_image") {
        if (!/^[a-zA-Z0-9\s,.-]+$/.test(value)) {
          error = "Only an image is allowed";
        }
      } else if (name === "vehicle_availability") {
        if (value === "--Select the Availability--") {
          error = "OVehicle availability is required";
        }
      } else if (name === "fuel_id") {
        if (!/^F\d+$/.test(value)) {
          error = "Enter Correct Fuel Id for the Vehicle (FXXX)";
        }
      }
    }
    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;
    let newErrors = {};

    Object.keys(formValues).forEach((name) => {
      const error = validateField(name, formValues[name]);
      if (error) {
        valid = false;
        newErrors[name] = error;
      }
    });

    setFormErrors(newErrors);

    if (valid && apiMethod === "post") {
      try {
        const response = await axios.post(
          "http://localhost:8080/vehicle/add",
          formValues
        );
        console.log("Response: ", response);
        if (response.status === 202) {
          alert("New vehicle added successfully");
          window.location.reload();
        }
      } catch (error) {
        if (error.response.status === 409 || error.response.status === 500) {
          alert("Error: " + error.response.data.message);
        } else {
          console.error("Error submitting form:", error);
          alert("Error submitting form: " + error.message);
        }
      }
    } else if (valid && apiMethod === "put") {
      if (JSON.stringify(defaultFieldValues) === JSON.stringify(formValues)) {
        alert("There is no change to update!");
      } else {
        try {
          const response = await axios.put(
            "http://localhost:8080/vehicle/update",
            formValues
          );

          if (response.status === 202) {
            alert("Vehicle updated successfully.");
            navigate("/vehicle");
          }
        } catch (error) {
          if (error.response.status === 400 || error.response.status === 500) {
            alert("Error: " + error.response.data.message);
          } else {
            console.error("Error submitting form:", error);
            alert("Error submitting form: " + error.message);
          }
        }
      }
    }
  };

  const handleClear = () => {
    if (apiMethod === "post") {
      setFormValues({
        vehicle_No: "",
        vehicle_type: "",
        vehicle_image: "",
        vehicle_availability: "--Select the Availability--",
        fuel_id: "",
      });
      setFormErrors({});
    } else {
      setFormValues(defaultFieldValues);
      setFormErrors({});
    }
  };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

  const fields = [
    { name: "vehicle_No", label: "Vehicle No ", required: true },
    { name: "vehicle_type", label: "Vehicle Type", required: true },
    { name: "vehicle_image", label: "Vehicle Image", required: true },
    {
      name: "vehicle_availability",
      label: "Vehicle Availability",
      required: true,
      options: [
        "Availabile",
        "Not Availabile"
      ],
    },
    { name: "fuel_id", label: "Fuel Id", required: true }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) =>
        field.name === "vehicle_availability" ? (
          <TextField
            select
            key={field.name}
            required={field.required}
            error={!!formErrors[field.name]}
            label={field.label}
            name={field.name}
            value={formValues[field.name]}
            onChange={handleChange}
            helperText={formErrors[field.name]}
            margin="dense"
            style={{ width: "48%", marginLeft: "2%" }}
          >
            <MenuItem value="--Select the Availability--">
              --Select the Availability--
            </MenuItem>
            {salaryParams.map((param) => (
              <MenuItem key={param.vehicle_availability} value={param.vehicle_availability}>
                {param.vehicle_availability}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            disabled={
              apiMethod === "put" && field.name === "empId" ? true : false
            }
            key={field.name}
            required={field.required}
            error={!!formErrors[field.name]}
            label={field.label}
            name={field.name}
            value={formValues[field.name]}
            onChange={handleChange}
            helperText={formErrors[field.name]}
            margin="dense"
            style={{ width: "48%", marginLeft: "2%" }}
          />
        )
      )}
      <Box style={{ textAlign: "center", display: "block", marginTop: "20px" }}>
        <Button
          type="reset"
          variant="outlined"
          style={{ margin: "0 20px", fontWeight: "bold" }}
          onClick={handleClear}
        >
          {resetBtnName}
        </Button>
        <Button
          disabled={submitBtnActiveState}
          type="submit"
          variant="contained"
          color="success"
          style={{ margin: "0 20px", fontWeight: "bold" }}
        >
          {submitBtnName}
        </Button>
      </Box>
    </form>
  );
}

export default VehicleForm;
