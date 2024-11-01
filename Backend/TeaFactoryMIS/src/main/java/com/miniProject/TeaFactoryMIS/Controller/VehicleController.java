//package com.miniProject.TeaFactoryMIS.Controller;
//
//
//import com.miniProject.TeaFactoryMIS.DTO.ResponseDTO;
//import com.miniProject.TeaFactoryMIS.DTO.VehicleDTO;
//import com.miniProject.TeaFactoryMIS.Service.VehicleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
////Controller class for managing vehicles
//
//@RestController
//@RequestMapping(value="/vehicle")
//@CrossOrigin
//
//public class VehicleController {
//
//    @Autowired
//    private VehicleService vehicleService;
//
//    @Autowired
//    private ResponseDTO responseDTO;
//
//    // Viewing all vehicles
//    @GetMapping("/view")
//    public ResponseEntity viewVehicles(){
//        try{
//            // Retrieve all vehicles
//            List<VehicleDTO> vehicleDTOList = vehicleService.viewAllVehicles();
//
//            // Check if list is empty
//            if(vehicleDTOList.isEmpty()){
//                responseDTO.setCode("NO_DATA_FOUND");
//                responseDTO.setMessage("No records of vehicles");
//            }else{
//                responseDTO.setCode("SUCCESS");
//                responseDTO.setMessage("Successfully fetched all vehicles");
//            }
//            responseDTO.setContent(vehicleDTOList);
//            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
//
//        }catch (Exception ex){
//            System.out.println("ERROR: "+ex.getMessage());
//
//            // Handle exceptions
//            responseDTO.setCode("ERROR");
//            responseDTO.setMessage(ex.getMessage());
//            responseDTO.setContent(null);
//            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    // Searching an vehicle by vehicle_No
//    @GetMapping("/search/{vehicle_No}")
//    public ResponseEntity searchVehicleByID(@PathVariable String vehicle_No){
//        try{
//            // Call service layer to search vehicle by vehicle_No
//            VehicleDTO vehicleDTO = vehicleService.searchVehicleByID(vehicle_No);
//
//            // Check if vehicle is found
//            if (vehicleDTO==null){
//                responseDTO.setCode("NO_DATA_FOUND");
//                responseDTO.setMessage("No records of the vehicle");
//            }else {
//                responseDTO.setCode("SUCCESS");
//                responseDTO.setMessage("Successfully fetched the vehicle");
//            }
//            responseDTO.setContent(vehicleDTO);
//            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
//
//        }catch (Exception ex){
//            System.out.println("ERROR: "+ex.getMessage());
//
//            // Handle exceptions
//            responseDTO.setCode("ERROR");
//            responseDTO.setMessage(ex.getMessage());
//            responseDTO.setContent(null);
//            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    // Adding a new vehicle
//    @PostMapping("/add")
//    public ResponseEntity addVehicle(@RequestBody VehicleDTO vehicleDTO){
//        try{
//            // Call service to add new vehicle
//            String response = vehicleService.addNewVehicle(vehicleDTO);
//
//            // Check response from service
//            if(response.equals("SUCCESS")){
//                responseDTO.setCode("SUCCESS");
//                responseDTO.setMessage("Successfully added vehicle");
//                responseDTO.setContent(vehicleDTO);
//                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
//            }
//            else{
//                responseDTO.setCode("DUPLICATED");
//                responseDTO.setMessage("Vehicle id already exists");
//                responseDTO.setContent(vehicleDTO);
//                return new ResponseEntity(responseDTO,HttpStatus.CONFLICT);
//            }
//        }catch (Exception ex){
//            System.out.println("ERROR: "+ex.getMessage());
//
//            // Handle exceptions
//            responseDTO.setCode("ERROR");
//            responseDTO.setMessage(ex.getMessage());
//            responseDTO.setContent(null);
//            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    // Updating an vehicle
//    @PutMapping("/update")
//    public ResponseEntity updateVehicle(@RequestBody VehicleDTO vehicleDTO){
//        try{
//            // Call service layer to update vehicle
//            String response = vehicleService.updateVehicle(vehicleDTO);
//
//            // Check response from service
//            if(response.equals("SUCCESS")){
//                responseDTO.setCode("SUCCESS");
//                responseDTO.setMessage("Successfully updated the vehicle");
//                responseDTO.setContent(vehicleDTO);
//                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
//            }
//            else{
//                responseDTO.setCode("NO_DATA_FOUND");
//                responseDTO.setMessage("Not found such an vehicle");
//                responseDTO.setContent(vehicleDTO);
//                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
//            }
//        }catch (Exception ex){
//            System.out.println("ERROR: "+ex.getMessage());
//
//            // Handle exceptions
//            responseDTO.setCode("ERROR");
//            responseDTO.setMessage(ex.getMessage());
//            responseDTO.setContent(null);
//            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    // Deleting an vehicle by ID
//    @DeleteMapping("/delete/{vehicle_No}")
//    public ResponseEntity deleteVehicleByID(@PathVariable String vehicle_No){
//
//        try{
//            // Call service to delete vehicle by ID
//            String response = vehicleService.deleteVehicleByID(vehicle_No);
//            if (response.equals("SUCCESS")){
//                responseDTO.setCode("SUCCESS");
//                responseDTO.setMessage("Successfully deleted the vehicle");
//                responseDTO.setContent(vehicle_No);
//                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
//            }else{
//                responseDTO.setCode("NO_DATA_FOUND");
//                responseDTO.setMessage("Not found such an vehicle");
//                responseDTO.setContent("vehicle_No: "+vehicle_No);
//                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
//            }
//
//        }catch (Exception ex){
//            System.out.println("ERROR: "+ex.getMessage());
//
//            // Handle exceptions
//            responseDTO.setCode("ERROR");
//            responseDTO.setMessage(ex.getMessage());
//            responseDTO.setContent(null);
//            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//}
