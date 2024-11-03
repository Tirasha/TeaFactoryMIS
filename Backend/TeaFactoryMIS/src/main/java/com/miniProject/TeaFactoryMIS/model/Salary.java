package com.miniProject.TeaFactoryMIS.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Salary {
    @Id
    private String salaryId;

}
