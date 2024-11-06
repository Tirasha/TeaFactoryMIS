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
    private String epf_etfId;

    @ManyToOne
    @JoinColumn(name = "empId", referencedColumnName = "empId", nullable = false)
    private Employee employee;

    @Temporal(TemporalType.DATE)
    private Date date;
    private double epf;
    private double etf;
}
