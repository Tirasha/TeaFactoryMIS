package com.miniProject.TeaFactoryMIS.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Data Transfer Object (DTO) class for Vehicles

@AllArgsConstructor
@NoArgsConstructor
@Data

public class VehicleDTO {
    private String vehicle_No ;
    private String vehicle_type;
    private byte[] vehicle_image;
    private String vehicle_availability;
    private String fuel_name;
}
