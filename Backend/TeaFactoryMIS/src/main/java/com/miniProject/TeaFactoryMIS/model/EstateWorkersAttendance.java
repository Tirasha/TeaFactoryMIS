package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class EstateWorkersAttendance {
    @Id
    private String attId;

    private LocalDateTime date;
    private String status;
    private String leaveDate;



    @ManyToOne
    @JoinColumn(name = "emp_id", referencedColumnName = "empId", nullable = false)
    private Employee employee;


}
