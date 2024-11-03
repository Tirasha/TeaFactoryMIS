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
    private String SalesId;
    private String TeaType;
    private Date Date;
    private int Tea_Quantity;
    private double Total_Amount;



}
