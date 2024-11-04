package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Inventories {

    @Id
    private String inv_id;
    private  String tea_type;
    private  double available_stock;
    private  double price_per_kg;
}
