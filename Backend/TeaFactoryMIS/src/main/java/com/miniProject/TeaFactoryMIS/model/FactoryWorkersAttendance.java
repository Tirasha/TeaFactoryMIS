package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
public class FactoryWorkersAttendance {

    @Id
    private String attId;
    @Temporal(TemporalType.DATE)
    private Date dob;
    private String status;

    private LocalDateTime check_in;

    private LocalDateTime check_out;



    @ManyToOne
    @JoinColumn(name = "emp_id", referencedColumnName = "empId", nullable = false)
    private Employee employee;


}
