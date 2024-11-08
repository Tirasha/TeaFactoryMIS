package com.miniProject.TeaFactoryMIS.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class VehicleDTO {
    private String vehicle_No ;
    private String vehicle_type;
//    private byte[] vehicle_image;
//    private Blob vehicle_image;
    private String vehicle_availability;
    private String fuel_id;
}
