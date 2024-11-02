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

@Table(name = "Machine")
public class Machine {
    @Id
    private String machine_id;

    @Column
    private String machine_type;

    @Column
    private String machine_quantity;

    @Column
    private String machine_availablity;
}
