package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.DTO.MachineDTO;
import com.miniProject.TeaFactoryMIS.Repository.MachineRepository;
import com.miniProject.TeaFactoryMIS.model.Machine;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;


@Service
@Transactional

public class MachineService {
    @Autowired
    private MachineRepository machineRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    // Retrieve all machines from the machine table.
    public List<Map<String,Object>> viewAllMachines(){
        String sql = "SELECT * FROM All_machines;";
        return jdbcTemplate.queryForList(sql);
    }

    // Search and return a machine by their ID from the machine table.
    public MachineDTO searchMachineByID(String machine_id){
        if (machineRepository.existsById(machine_id)){
            Machine machines = machineRepository.findById(machine_id).orElse(null);
            return modelMapper.map(machines, MachineDTO.class);
        } else {
            return null;
        }
    }

    // Save a new machine in the machine table.
    public String addNewMachine(MachineDTO machineDTO)
    {
        Machine machine = new Machine();
        machine.setMachine_id(machineDTO.getMachine_id());
        machine.setMachine_type(machineDTO.getMachine_type());
        machine.setMachine_quantity(machineDTO.getMachine_quantity());
        machine.setMachine_availability(machineDTO.getMachine_availability());
        machine.setFuel_id(machineDTO.getFuel_id());
        machineRepository.save(machine);
        return "SUCCESS";
    }

    // Update a machine in the machine table.
    public String updateMachine(MachineDTO machineDTO){
        if(machineRepository.existsById(machineDTO.getMachine_id())){
            machineRepository.save(modelMapper.map(machineDTO,Machine.class));
            return "SUCCESS";
        } else {
            return "NO_DATA_FOUND";
        }
    }

    // Delete a machine from the machine table.
    public String deleteMachineByID(String machine_id){
        if (machineRepository.existsById(machine_id)){
            machineRepository.deleteById(machine_id);
            return "SUCCESS";
        } else {
            return "NO_DATA_FOUND";
        }
    }
}
