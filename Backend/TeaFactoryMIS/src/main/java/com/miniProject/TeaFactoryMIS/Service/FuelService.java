package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.DTO.FuelDTO;
import com.miniProject.TeaFactoryMIS.DTO.VehicleDTO;
import com.miniProject.TeaFactoryMIS.Repository.FuelRepository;
import com.miniProject.TeaFactoryMIS.model.Fuel;
import com.miniProject.TeaFactoryMIS.model.Vehicle;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@Transactional

public class FuelService {
    @Autowired
    private FuelRepository fuelRepository;

    @Autowired
    private ModelMapper modelMapper;


    // Retrieve all fuel from the fuel table.
    public List<Fuel> viewAllFuel(){
        List<Fuel> fuelList = fuelRepository.findAll();
        return modelMapper.map(fuelList, new TypeToken<List<FuelDTO>>(){}.getType());
    }

    // Search and return a fuel by their name from the fuel table.
//    public Fuel searchFuelByName(String fuel_name){
//        if (fuelRepository.existsById(fuel_name)){
//            Fuel fuel = fuelRepository.findByFuelName(fuel_name).orElse(null);
//            return modelMapper.map(fuel, Fuel.class);
//        } else {
//            return null;
//        }
//    }

    public FuelDTO searchFuelByID(String fuel_id){
        if (fuelRepository.existsById(fuel_id)){
            Fuel fuel = fuelRepository.findById(fuel_id).orElse(null);
            return modelMapper.map(fuel, FuelDTO.class);
        } else {
            return null;
        }
    }

    // Save a new fuel in the fuel table.
    public String addNewFuel(Fuel fuel){
        if(fuelRepository.existsById(fuel.getFuel_id())){
            return "DUPLICATED";
        } else {
            fuelRepository.save(modelMapper.map(fuel, Fuel.class));
            return "SUCCESS";
        }
    }

    // Update a fuel in the fuel table.
    public String updateFuel(Fuel fuel){
        if(fuelRepository.existsById(fuel.getFuel_id())){
            fuelRepository.save(modelMapper.map(fuel,Fuel.class));
            return "SUCCESS";
        } else {
            return "NO_DATA_FOUND";
        }
    }

    // Delete a fuel from the fuel table.
    public String deleteFuelByID(String fuel_id){
        if (fuelRepository.existsById(fuel_id)){
            fuelRepository.deleteById(fuel_id);
            return "SUCCESS";
        } else {
            return "NO_DATA_FOUND";
        }
    }
}

