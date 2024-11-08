package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.EstateWorkersAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EstWorkersAttRepository extends JpaRepository<EstateWorkersAttendance, String> {

    // Custom query method to find attendance by employee ID
    List<EstateWorkersAttendance> findByEmployee_EmpId(String empId);

    @Query("SELECT e FROM EstateWorkersAttendance e WHERE e.employee.empId = :empId AND YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<EstateWorkersAttendance> filterByEmpIdAndDate(@Param("empId") String empId, @Param("year") int year, @Param("month") int month);


}
