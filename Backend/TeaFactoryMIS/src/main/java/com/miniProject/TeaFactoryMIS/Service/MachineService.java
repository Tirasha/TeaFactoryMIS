package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.DTO.MachineDTO;
import com.miniProject.TeaFactoryMIS.Repository.MachineRepository;
import com.miniProject.TeaFactoryMIS.model.Machine;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//Service class for managing Machine entities

@Service
@Transactional

public class MachineService {
    @Autowired
    private MachineRepository machineRepository;

    // ModelMapper for mapping between entities and DTOs
//    @Autowired
    private ModelMapper modelMapper;


    // Retrieve all machines from the machine table.
    public List<MachineDTO> viewAllMachines(){
        // Retrieve all machines from repository
        List<Machine> machineList = machineRepository.findAll();
        // Convert to DTOs and return
        return modelMapper.map(machineList, new TypeToken<List<MachineDTO>>(){}.getType());
    }

    // Search and return a machine by their ID from the machine table.
    public MachineDTO searchMachineByID(String machine_id){
        // Check if machine exists
        if (machineRepository.existsById(machine_id)){
            // Retrieve machine from repository and map to DTO
            Machine machine = machineRepository.findById(machine_id).orElse(null);
            return modelMapper.map(machine, MachineDTO.class);
        } else {
            // Return null if vehicle not found
            return null;
        }
    }

    // Save a new machine in the machine table.
    public String addNewMachine(MachineDTO machineDTO){
        // Check if machine ID already exists
        if(machineRepository.existsById(machineDTO.getMachine_id())){
            // Return response indicating duplication
            return "DUPLICATED";
        } else {
            // Save new machine to repository
            machineRepository.save(modelMapper.map(machineDTO, Machine.class));
            // Return success response
            return "SUCCESS";
        }
    }

    // Update a machine in the machine table.
    public String updateMachine(MachineDTO machineDTO){
        // Check if machine exists
        if(machineRepository.existsById(machineDTO.getMachine_id())){
            // Update machine in repository
            machineRepository.save(modelMapper.map(machineDTO,Machine.class));
            // Return success response
            return "SUCCESS";
        } else {
            // Return response indicating machine not found
            return "NO_DATA_FOUND";
        }
    }

    // Delete a machine from the machine table.
    public String deleteMachineByID(String machine_id){
        // Check if machine exists
        if (machineRepository.existsById(machine_id)){
            // Delete machine from repository
            machineRepository.deleteById(machine_id);
            // Return success response
            return "SUCCESS";
        } else {
            // Return response indicating machine not found
            return "NO_DATA_FOUND";
        }
    }
}
