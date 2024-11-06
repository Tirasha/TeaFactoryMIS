package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SalaryRepository extends JpaRepository<Salary,String> {

}
