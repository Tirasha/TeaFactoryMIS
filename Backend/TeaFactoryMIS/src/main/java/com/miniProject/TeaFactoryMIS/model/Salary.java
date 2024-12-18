package com.miniProject.TeaFactoryMIS.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long salaryId;
    @ManyToOne
    @JoinColumn(name = "empId", referencedColumnName = "empId", nullable = false)
    private Employee employee;

    private String role;
    @Temporal(TemporalType.DATE)
    private Date start_date;
    @Temporal(TemporalType.DATE)
    private Date end_date;
    private int total_working_days;
    private double day_payment;
    private double salary;
    @Temporal(TemporalType.DATE)
    private Date salary_paid_date;





}
