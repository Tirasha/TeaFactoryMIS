package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.Fuel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FuelRepository extends JpaRepository<Fuel, String> {
    Optional<Fuel> findByFuelName(String fuel_name);

//    @Query("SELECT f FROM Fuel f WHERE f.fuel_name = :fuel_name")
//    Optional<Fuel> findByFuelName(@Param("fuel_name") String fuelName);

}
