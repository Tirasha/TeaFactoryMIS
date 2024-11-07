package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.DTO.VehicleDTO;
import com.miniProject.TeaFactoryMIS.Repository.VehicleRepository;
import com.miniProject.TeaFactoryMIS.model.Vehicle;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    // Retrieve all vehicles from the vehicle table.
    public List<Map<String,Object>> viewAllVehicles(){
        String sql = "SELECT * FROM All_vehicles;";
        return jdbcTemplate.queryForList(sql);
    }

    // Search and return a vehicle by their ID from the vehicle table.
    public VehicleDTO searchVehicleByID(String vehicle_No){
        if (vehicleRepository.existsById(vehicle_No)){
            Vehicle vehicle = vehicleRepository.findById(vehicle_No).orElse(null);
            return modelMapper.map(vehicle, VehicleDTO.class);
        } else {
            return null;
        }
    }

    // Save a new vehicle in the vehicle table.
        public String addNewVehicle(VehicleDTO vehicleDTO) {
            Vehicle vehicle = new Vehicle();
            vehicle.setVehicle_No(vehicleDTO.getVehicle_No());
            vehicle.setVehicle_type(vehicleDTO.getVehicle_type());
//            vehicle.setVehicle_image(vehicleDTO.getVehicle_image());
            vehicle.setVehicle_availability(vehicleDTO.getVehicle_availability());
            vehicle.setFuel_id(vehicleDTO.getFuel_id());

            try {
                vehicleRepository.save(vehicle);
                return "SUCCESS";
            } catch (DataIntegrityViolationException e) {
                return "DUPLICATED";
            }
        }

    // Update a vehicle in the vehicle table.
    public String updateVehicle(VehicleDTO vehicleDTO){
        if(vehicleRepository.existsById(vehicleDTO.getVehicle_No())){
            vehicleRepository.save(modelMapper.map(vehicleDTO,Vehicle.class));
            return "SUCCESS";
        } else {
            return "NO_DATA_FOUND";
        }
    }

    // Delete a vehicle from the vehicle table.
    public String deleteVehicleByID(String vehicle_No){
        if (vehicleRepository.existsById(vehicle_No)){
            vehicleRepository.deleteById(vehicle_No);
            return "SUCCESS";
        } else {
            return "NO_DATA_FOUND";
        }
    }
}
