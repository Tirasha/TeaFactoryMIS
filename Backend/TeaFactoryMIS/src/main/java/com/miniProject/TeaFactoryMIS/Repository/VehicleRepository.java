package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, String> {
}
