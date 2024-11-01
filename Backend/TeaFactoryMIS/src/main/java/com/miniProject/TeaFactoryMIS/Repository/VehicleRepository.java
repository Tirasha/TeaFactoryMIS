package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.*;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, String> {

    // Get all vehicle IDs.
    @Query(value = "SELECT vehicle_No FROM vehicle", nativeQuery = true)
    List<String> getAllVehicleId();
}
