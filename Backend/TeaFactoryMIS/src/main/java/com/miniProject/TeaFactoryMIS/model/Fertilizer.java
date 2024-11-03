package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Fertilizer {

    @Id
    private  String Fer_ID;
    private  String  Name;
    private String Type;
    private String Quantity;


}
