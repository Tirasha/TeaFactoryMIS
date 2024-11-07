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

@Table(name = "All_machines")
public class Machine {
    @Id
    @Column(name = "machine_id")
    private String machine_id;

    @Column(name = "machine_type")
    private String machine_type;

    @Column(name = "machine_quantity")
    private String machine_quantity;

    @Column(name = "machine_availability")
    private String machine_availability;

    @Column(name = "fuel_name")
    private String fuel_name;
}
