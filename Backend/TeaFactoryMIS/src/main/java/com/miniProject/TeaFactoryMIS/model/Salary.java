package com.miniProject.TeaFactoryMIS.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
public class Salary {
    @Id
    private String salaryId;
    @ManyToOne
    @JoinColumn(name = "emp_id", referencedColumnName = "empId", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name="basicId", referencedColumnName = "basicId", nullable = false)
    private Basics basics;

    @Temporal(TemporalType.DATE)
    private Date date;

    private double actualAmount;
    private double epf;
    private double bonus;
    private double ot;
    private double paidAmount;


}
