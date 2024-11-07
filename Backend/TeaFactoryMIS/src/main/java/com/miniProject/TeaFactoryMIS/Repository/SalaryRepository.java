package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface SalaryRepository extends JpaRepository<Salary,String> {
    @Query(value = "CALL CalculateWorkingDays(:empId)", nativeQuery = true)
    Integer getWorkingDays(@Param("empId") String empId);

    @Query(value = "CALL GetWorkingDaysInRange(:startDate, :endDate)", nativeQuery = true)
    List<Object[]> getEstateWorkersSalary(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
