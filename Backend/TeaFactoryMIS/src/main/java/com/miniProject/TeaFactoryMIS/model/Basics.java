package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Basics {
    @Id
    private String basicId;
    private String role;
    private double dayPayment;

}
