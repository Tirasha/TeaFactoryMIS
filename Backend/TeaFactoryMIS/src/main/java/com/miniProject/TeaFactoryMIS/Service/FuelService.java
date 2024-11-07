package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.DTO.FuelDTO;
import com.miniProject.TeaFactoryMIS.Repository.FuelRepository;
import com.miniProject.TeaFactoryMIS.model.Fuel;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//Service class for managing Fuel entities

@Service
@Transactional

public class FuelService {
    @Autowired
    private FuelRepository fuelRepository;

    // ModelMapper for mapping between entities and DTOs
    @Autowired
    private ModelMapper modelMapper;


    // Retrieve all fuel from the fuel table.
    public List<FuelDTO> viewAllFuel(){
        // Retrieve all fuel from repository
        List<Fuel> fuelList = fuelRepository.findAll();
        // Convert to DTOs and return
        return modelMapper.map(fuelList, new TypeToken<List<FuelDTO>>(){}.getType());
    }

    // Search and return a fuel by their name from the fuel table.
    public FuelDTO searchFuelByName(String fuel_name){
        // Check if fuel exists
        if (fuelRepository.existsById(fuel_name)){
            // Retrieve machine from repository and map to DTO
            Fuel fuel = fuelRepository.findByFuelName(fuel_name).orElse(null);
            return modelMapper.map(fuel, FuelDTO.class);
        } else {
            // Return null if fuel not found
            return null;
        }
    }

//    public FuelDTO searchFuelByName(String fuel_name) {
//        Fuel fuel = fuelRepository.findByFuelName(fuel_name).orElse(null);
//        if (fuel != null) {
//            return modelMapper.map(fuel, FuelDTO.class);
//        } else {
//            return null;
//        }
//    }

    // Save a new fuel in the fuel table.
    public String addNewFuel(FuelDTO fuelDTO){
        // Check if fuel ID already exists
        if(fuelRepository.existsById(fuelDTO.getFuel_id())){
            // Return response indicating duplication
            return "DUPLICATED";
        } else {
            // Save new fuel to repository
            fuelRepository.save(modelMapper.map(fuelDTO, Fuel.class));
            // Return success response
            return "SUCCESS";
        }
    }

    // Update a fuel in the fuel table.
    public String updateFuel(FuelDTO fuelDTO){
        // Check if fuel exists
        if(fuelRepository.existsById(fuelDTO.getFuel_id())){
            // Update fuel in repository
            fuelRepository.save(modelMapper.map(fuelDTO,Fuel.class));
            // Return success response
            return "SUCCESS";
        } else {
            // Return response indicating fuel not found
            return "NO_DATA_FOUND";
        }
    }

    // Delete a fuel from the fuel table.
    public String deleteFuelByID(String fuel_id){
        // Check if fuel exists
        if (fuelRepository.existsById(fuel_id)){
            // Delete fuel from repository
            fuelRepository.deleteById(fuel_id);
            // Return success response
            return "SUCCESS";
        } else {
            // Return response indicating fuel not found
            return "NO_DATA_FOUND";
        }
    }
}
