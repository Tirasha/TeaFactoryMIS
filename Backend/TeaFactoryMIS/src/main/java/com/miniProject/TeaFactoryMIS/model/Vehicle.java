package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;

@Entity
@Getter
@Setter

@Table(name = "vehicle")
public class Vehicle {
    @Id
    @Column(name = "vehicle_No")
    private String vehicle_No ;

    @Column(name = "vehicle_type")
    private String vehicle_type;

//    @Lob
//    @Column(name = "vehicle_image", length = 1000)
//    private byte[] vehicle_image;
//    private Blob vehicle_image;

    @Column(name = "vehicle_availability")
    private String vehicle_availability;

    @Column(name = "fuel_id")
    private String fuel_id;
}