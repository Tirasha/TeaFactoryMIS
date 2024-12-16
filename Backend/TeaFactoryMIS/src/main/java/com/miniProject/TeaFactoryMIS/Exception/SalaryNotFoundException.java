package com.miniProject.TeaFactoryMIS.Exception;

import com.miniProject.TeaFactoryMIS.model.Salary;

public class SalaryNotFoundException extends RuntimeException{
    public SalaryNotFoundException(Long salaryId){
        super("Cound not found the salary with ID"+salaryId);
    }
}
