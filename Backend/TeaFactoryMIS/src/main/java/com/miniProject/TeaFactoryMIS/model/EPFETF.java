package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Entity
@Getter
@Setter
public class EPFETF {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long epf_etfId;
    private String empId;

    @Temporal(TemporalType.DATE)
    private Date date;
    private double basicSalary;
    private double employeeContributionEPF;
    private double employerContributionEPF;
    private double epfAmount;
    private double employerContributionETF;

}
