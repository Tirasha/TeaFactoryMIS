package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.DTO.ResponseDTO;
import com.miniProject.TeaFactoryMIS.DTO.VehicleDTO;
import com.miniProject.TeaFactoryMIS.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value="/vehicle")
@CrossOrigin

public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private ResponseDTO responseDTO;

    // Viewing all vehicles
    @GetMapping("/view")
    public ResponseEntity viewVehicles(){
        try{
            List<Map<String, Object>> vehicleDTOList = vehicleService.viewAllVehicles();

            if(vehicleDTOList.isEmpty()){
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("No records of vehicles");
            }else{
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully fetched all vehicles");
            }
            responseDTO.setContent(vehicleDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());
            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Searching a vehicle by vehicle_No
    @GetMapping("/search/{vehicle_No}")
    public ResponseEntity searchVehicleByID(@PathVariable String vehicle_No){
        try{
            VehicleDTO vehicleDTO = vehicleService.searchVehicleByID(vehicle_No);

            if (vehicleDTO==null){
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("No records of the vehicle");
            }else {
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully fetched the vehicle");
            }
            responseDTO.setContent(vehicleDTO);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Adding a new vehicle
    @PostMapping("/add")
    public ResponseEntity<ResponseDTO> addVehicle(@RequestBody VehicleDTO vehicleDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            String response = vehicleService.addNewVehicle(vehicleDTO);
            if ("SUCCESS".equals(response)) {
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully added vehicle");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode("DUPLICATED");
                responseDTO.setMessage("Vehicle No already exists");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.CONFLICT);
            }
        } catch (Exception ex) {
            System.out.println("ERROR: " + ex.getMessage());
            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Updating a vehicle
    @PutMapping("/update")
    public ResponseEntity updateVehicle(@RequestBody VehicleDTO vehicleDTO){
        try{
            String response = vehicleService.updateVehicle(vehicleDTO);

            if(response.equals("SUCCESS")){
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully updated the vehicle");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
            }
            else{
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("Not found such a vehicle");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Deleting a vehicle by ID
    @DeleteMapping("/delete/{vehicle_No}")
    public ResponseEntity deleteVehicleByID(@PathVariable String vehicle_No){

        try{
            String response = vehicleService.deleteVehicleByID(vehicle_No);
            if (response.equals("SUCCESS")){
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully deleted the vehicle");
                responseDTO.setContent(vehicle_No);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
            }else{
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("Not found such a vehicle");
                responseDTO.setContent("Vehicle_No: " + vehicle_No);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
