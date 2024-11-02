package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.DTO.VehicleDTO;
import com.miniProject.TeaFactoryMIS.Repository.VehicleRepository;
import com.miniProject.TeaFactoryMIS.model.Vehicle;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

//Service class for managing Vehicle entities

@Service
@Transactional
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    // ModelMapper for mapping between entities and DTOs
//    @Autowired
    private ModelMapper modelMapper;


    // Retrieve all vehicles from the vehicle table.
    public List<VehicleDTO> viewAllVehicles(){
        // Retrieve all vehicles from repository
        List<Vehicle> vehicleList = vehicleRepository.findAll();
        // Convert to DTOs and return
        return modelMapper.map(vehicleList, new TypeToken<List<VehicleDTO>>(){}.getType());
    }

    // Search and return a vehicle by their ID from the vehicle table.
    public VehicleDTO searchVehicleByID(String vehicle_No){
        // Check if vehicle exists
        if (vehicleRepository.existsById(vehicle_No)){
            // Retrieve vehicle from repository and map to DTO
            Vehicle vehicle = vehicleRepository.findById(vehicle_No).orElse(null);
            return modelMapper.map(vehicle, VehicleDTO.class);
        } else {
            // Return null if vehicle not found
            return null;
        }
    }

    // Save a new vehicle in the vehicle table.
    public String addNewVehicle(VehicleDTO vehicleDTO){
        // Check if vehicle ID already exists
        if(vehicleRepository.existsById(vehicleDTO.getVehicle_No())){
            // Return response indicating duplication
            return "DUPLICATED";
        } else {
            // Save new vehicle to repository
            vehicleRepository.save(modelMapper.map(vehicleDTO, Vehicle.class));
            // Return success response
            return "SUCCESS";
        }
    }

    // Update a vehicle in the vehicle table.
    public String updateVehicle(VehicleDTO vehicleDTO){
        // Check if vehicle exists
        if(vehicleRepository.existsById(vehicleDTO.getVehicle_No())){
            // Update vehicle in repository
            vehicleRepository.save(modelMapper.map(vehicleDTO,Vehicle.class));
            // Return success response
            return "SUCCESS";
        } else {
            // Return response indicating vehicle not found
            return "NO_DATA_FOUND";
        }
    }

    // Delete a vehicle from the vehicle table.
    public String deleteVehicleByID(String vehicle_No){
        // Check if vehicle exists
        if (vehicleRepository.existsById(vehicle_No)){
            // Delete vehicle from repository
            vehicleRepository.deleteById(vehicle_No);
            // Return success response
            return "SUCCESS";
        } else {
            // Return response indicating vehicle not found
            return "NO_DATA_FOUND";
        }
    }
}
