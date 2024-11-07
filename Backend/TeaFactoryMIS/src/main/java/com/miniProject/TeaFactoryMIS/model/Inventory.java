package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Inventory {

    @Id
    private String inventory_id;
    private  String type;
    private double available_stock;
    private double price_per_kg;

}
