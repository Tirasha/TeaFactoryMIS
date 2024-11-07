package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.DTO.ResponseDTO;
import com.miniProject.TeaFactoryMIS.Service.FuelService;
import com.miniProject.TeaFactoryMIS.model.Fuel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping(value="/fuel")
@CrossOrigin

public class FuelController {
    @Autowired
    private FuelService fuelService;

    @Autowired
    private ResponseDTO responseDTO;

    // Viewing all fuel
    @GetMapping("/view")
    public ResponseEntity viewFuel(){
        try{
            List<Fuel> fuelList = fuelService.viewAllFuel();

            if(fuelList.isEmpty()){
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("No records of fuel");
            }else{
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully fetched all fuel");
            }
            responseDTO.setContent(fuelList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Searching a fuel by fuel_name
    @GetMapping("/search/{fuel_name}")
    public ResponseEntity<String> searchFuelByName(@PathVariable String fuel_name){
        try{
            Fuel fuel = fuelService.searchFuelByName(fuel_name);

            if (fuel==null){
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("No records of the fuel");
            }else {
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully fetched the fuel");
            }
            responseDTO.setContent(fuel);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Adding a new fuel
    @PostMapping("/add")
    public ResponseEntity<String> addFuel(@RequestBody Fuel fuel){
        try{
            String response = fuelService.addNewFuel(fuel);

            if(response.equals("SUCCESS")){
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully added fuel");
                responseDTO.setContent(fuel);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
            }
            else{
                responseDTO.setCode("DUPLICATED");
                responseDTO.setMessage("Fuel id already exists");
                responseDTO.setContent(fuel);
                return new ResponseEntity(responseDTO,HttpStatus.CONFLICT);
            }
        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Updating a fuel
    @PutMapping("/update")
    public ResponseEntity<String> updateFuel(@RequestBody Fuel fuel){
        try{
            String response = fuelService.updateFuel(fuel);

            if(response.equals("SUCCESS")){
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully updated the fuel");
                responseDTO.setContent(fuel);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
            }
            else{
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("Not found such a fuel");
                responseDTO.setContent(fuel);
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

    // Deleting a fuel by ID
    @DeleteMapping("/delete/{fuel_id}")
    public ResponseEntity<String> deleteFuelByID(@PathVariable String fuel_id){

        try{
            String response = fuelService.deleteFuelByID(fuel_id);
            if (response.equals("SUCCESS")){
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully deleted the fuel");
                responseDTO.setContent(fuel_id);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
            }else{
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("Not found such a fuel");
                responseDTO.setContent("Fuel_id: " + fuel_id);
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
