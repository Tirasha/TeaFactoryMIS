package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@Table(name = "fuel")
public class Fuel {
    @Id
    @Column(name = "fuel_id")
    private String fuel_id;

    @Column(name = "fuel_name")
    private String fuelName;

    @Column(name = "fuel_type")
    private String fuel_type;

    @Column(name = "fuel_quantity")
    private String fuel_quantity;
}

