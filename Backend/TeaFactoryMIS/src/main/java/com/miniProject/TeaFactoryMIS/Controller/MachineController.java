package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.DTO.MachineDTO;
import com.miniProject.TeaFactoryMIS.DTO.ResponseDTO;
import com.miniProject.TeaFactoryMIS.Service.MachineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value="/machine")
@CrossOrigin

public class MachineController {
    @Autowired
    private MachineService machineService;

    @Autowired
    private ResponseDTO responseDTO;

    // Viewing all machines
    @GetMapping("/view")
    public ResponseEntity viewMachines(){
        try{
            List<Map<String, Object>> machineList = machineService.viewAllMachines();

            if(machineList.isEmpty()){
                responseDTO.setCode("NO_DATA_FOUND");
                responseDTO.setMessage("No records of machines");
            }else{
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully fetched all machines");
            }
            responseDTO.setContent(machineList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        }catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());

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
            MachineDTO machineDTO = machineService.searchMachineByID(machine_id);

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

            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Adding a new machine
    @PostMapping("/add")
    public ResponseEntity<ResponseDTO> addMachine(@RequestBody MachineDTO machineDTO)
    {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            String response = machineService.addNewMachine(machineDTO);
            if ("SUCCESS".equals(response))
            {
                responseDTO.setCode("SUCCESS");
                responseDTO.setMessage("Successfully added vehicle");
                responseDTO.setContent(machineDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode("DUPLICATED");
                responseDTO.setMessage("Vehicle No already exists");
                responseDTO.setContent(machineDTO);
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

    // Updating a machine
    @PutMapping("/update")
    public ResponseEntity updateMachine(@RequestBody MachineDTO machineDTO){
        try{
            String response = machineService.updateMachine(machineDTO);

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

            responseDTO.setCode("ERROR");
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
