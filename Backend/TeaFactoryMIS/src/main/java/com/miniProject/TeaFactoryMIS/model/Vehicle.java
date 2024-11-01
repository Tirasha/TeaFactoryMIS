package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@Table(name = "Vehicle")
public class Vehicle {
    @Id
    private String vehicle_No ;

    @Column
    private String vehicle_type;

    @Lob
    @Column(name = "vehicle_image", length = 1000)
    private byte[] vehicle_image;

    @Column
    private String vehicle_availability;
}






