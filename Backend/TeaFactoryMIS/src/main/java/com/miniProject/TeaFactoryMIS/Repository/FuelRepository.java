package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.Fuel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FuelRepository extends JpaRepository<Fuel, String> {
    Optional<Fuel> findByFuelName(String fuelName);
}
