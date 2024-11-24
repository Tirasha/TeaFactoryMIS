package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.Repository.EmployeeRepository;
import com.miniProject.TeaFactoryMIS.Repository.SalaryRepository;
import com.miniProject.TeaFactoryMIS.model.Employee;
import com.miniProject.TeaFactoryMIS.model.Salary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SalaryService {
//    @Autowired
//    private SalaryRepository salaryRepository;
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    @Autowired
//    private EmployeeRepository employeeRepository;

//    public Integer calculateWorkingDays(String empId) {
//        return salaryRepository.getWorkingDays(empId);
//    }

//    public List<Map<String,Object>> getEstateWorkers(){
//        String query="select * from EstateWorkers";
//        return jdbcTemplate.queryForList(query);
//    }
//    public List<Map<String, Object>> getEstateWorkersSalary(){
//        String query1="select * from contributeAll";
//        return jdbcTemplate.queryForList(query1);
//    }

//    public List<Object[]> getEstateWorkersSalary(Date startDate, Date endDate) {
//        return salaryRepository.getEstateWorkersSalary(startDate, endDate);
//    }

//    public void saveCalculatedSalaries(List<Object[]> salaryDetails) {
//        for (Object[] details : salaryDetails) {
//            String empId = (String) details[0];
//            Optional<Employee> optionalEmployee = employeeRepository.findByEmpId(empId);
//
//            if (optionalEmployee.isPresent()) {
//                Employee employee = optionalEmployee.get();
//
//                Salary salary = new Salary();
//                salary.setEmployee(employee);
//                salary.setRole((String) details[1]);
//                salary.setStart_date((Date) details[2]);
//                salary.setEnd_date((Date) details[3]);
//
//                // Convert the Long to Integer
//                salary.setTotal_working_days(((Long) details[4]).intValue());
//
//                salary.setDay_payment((Double) details[5]);
//                salary.setSalary((Double) details[6]);
//                salary.setSalary_paid_date((Date) details[7]);
//
//                salaryRepository.save(salary);
//            } else {
//                System.out.println("Employee with empId " + empId + " not found.");
//            }
//        }
  //  }




}
