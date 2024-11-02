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
    private String fuel_id;

    @Column
    private String fuel_name;

    @Column
    private String fuel_type;

    @Column
    private String fuel_quantity;
}
