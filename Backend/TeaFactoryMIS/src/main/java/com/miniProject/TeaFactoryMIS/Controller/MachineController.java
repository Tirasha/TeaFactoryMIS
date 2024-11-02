package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.DTO.MachineDTO;
import com.miniProject.TeaFactoryMIS.DTO.ResponseDTO;
import com.miniProject.TeaFactoryMIS.Service.MachineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Controller class for managing machines

@RestController
@RequestMapping(value="/machine")
@CrossOrigin

public class MachineController {
    @Autowired
    private MachineService machineService;

    @Autowired
    private ResponseDTO responseDTO;

    // Viewing all vehicles
    @GetMapping("/view")
    public ResponseEntity viewMachines(){
        try{
            // Retrieve all machines
            List<MachineDTO> machineDTOList = machineService.viewAllMachines();

            // Check if list is empty
            if(machineDTOList.isEmpty()){
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("No records of machines");
            }else{
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully fetched all machines");
            }
            responseDTO.setContent(machineDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            // Handle exceptions
            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Searching a machine by machine_id
    @GetMapping("/search/{machine_id}")
    public ResponseEntity searchMachineByID(@PathVariable String machine_id){
        try{
            // Call service layer to search machine by machine_id
            MachineDTO machineDTO = machineService.searchMachineByID(machine_id);

            // Check if machine is found
            if (machineDTO==null){
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("No records of the machine");
            }else {
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully fetched the machine");
            }
            responseDTO.setContent(machineDTO);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            // Handle exceptions
            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Adding a new machine
    @PostMapping("/add")
    public ResponseEntity addMachine(@RequestBody MachineDTO machineDTO){
        try{
            // Call service to add new machine
            String response = machineService.addNewMachine(machineDTO);

            // Check response from service
            if(response.equals("SUCCESS")){
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully added machine");
                responseDTO.setContent(machineDTO);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
            }
            else{
                responseDTO.setCode("DUPLICATED");
                responseDTO.setMessage("Machine id already exists");
                responseDTO.setContent(machineDTO);
                return new ResponseEntity(responseDTO,HttpStatus.CONFLICT);
            }
        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            // Handle exceptions
            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Updating a machine
    @PutMapping("/update")
    public ResponseEntity updateMachine(@RequestBody MachineDTO machineDTO){
        try{
            // Call service layer to update machine
            String response = machineService.updateMachine(machineDTO);

            // Check response from service
            if(response.equals("SUCCESS")){
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully updated the machine");
                responseDTO.setContent(machineDTO);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
            }
            else{
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("Not found such a machine");
                responseDTO.setContent(machineDTO);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            // Handle exceptions
            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Deleting a machine by ID
    @DeleteMapping("/delete/{machine_id}")
    public ResponseEntity deleteMachineByID(@PathVariable String machine_id){

        try{
            // Call service to delete machine by ID
            String response = machineService.deleteMachineByID(machine_id);
            if (response.equals("SUCCESS")){
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully deleted the machine");
                responseDTO.setContent(machine_id);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);
            }else{
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("Not found such a machine");
                responseDTO.setContent("Machine_id: " + machine_id);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

            // Handle exceptions
            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
