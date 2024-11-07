package com.miniProject.TeaFactoryMIS.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Sales {

    @Id
    private String salesId;
    private String teaType;
    private Date date;
    private double tea_Quantity;
    private double total_Amount;

    @ManyToOne
    @JoinColumn(name = "inventory_id", referencedColumnName = "inventory_id", nullable = false)
    private Inventory inventory;


}
