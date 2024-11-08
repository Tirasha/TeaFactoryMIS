package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.FactoryWorkersAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacWorkersAttRepository extends JpaRepository<FactoryWorkersAttendance, String> {

    // Custom query to find attendance records by employee ID
    List<FactoryWorkersAttendance> findByEmployee_EmpId(String empId);

}
