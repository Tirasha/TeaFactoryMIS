package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.Employee;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Optional<Employee> findByEmpId(String empId); // Added method to find by empId

    @Transactional
    @Procedure("teafactorymis.spGetDetailsByEmpID")
    Employee spGetDetailsByEmpID(@Param("empId") String empId);


}
