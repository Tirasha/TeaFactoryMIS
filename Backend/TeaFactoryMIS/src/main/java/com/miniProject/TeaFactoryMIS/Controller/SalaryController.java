package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.BasicNotFoundException;
import com.miniProject.TeaFactoryMIS.Exception.EpfEtfNotFoundException;
import com.miniProject.TeaFactoryMIS.Exception.SalaryNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.EmployeeRepository;
import com.miniProject.TeaFactoryMIS.Repository.EstWorkersAttRepository;
import com.miniProject.TeaFactoryMIS.Repository.SalaryRepository;
import com.miniProject.TeaFactoryMIS.Service.SalaryService;
import com.miniProject.TeaFactoryMIS.model.Basics;
import com.miniProject.TeaFactoryMIS.model.Employee;
import com.miniProject.TeaFactoryMIS.model.EstateWorkersAttendance;
import com.miniProject.TeaFactoryMIS.model.Salary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SalaryController {
    @Autowired
    private SalaryRepository salaryRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EstWorkersAttRepository estWorkersAttRepository;

    @PostMapping("/salaryAdd")
    Salary newSalary(@RequestBody Salary newSalary){
        return salaryRepository.save(newSalary);
    }
//    Salary newSalary(@RequestParam ("day_payment") double day_payment,
//                     @RequestParam ("role") String role,
//                     @RequestParam ("empId") String empId,
//                     @RequestParam ("start_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date start_date,
//                     @RequestParam ("end_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date end_date,
//                     @RequestParam ("total_working_days") int total_working_days,
//                     @RequestParam ("salary") double salary,
//                     @RequestParam ("salary _paid_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date salary_paid_date){
//        Salary newSalary=new Salary();
//        Optional<Employee> employee=employeeRepository.findById(empId);
//        Optional<EstateWorkersAttendance> estateWorkersAttendance=estWorkersAttRepository.findById(empId);
//
//        if(employee.isPresent()){
//            newSalary.setEmployee(employee.get());
//        }else {
//            throw new IllegalArgumentException("Invalid empId"+empId);
//        }
//
//        newSalary.setRole(role);
//        newSalary.setDay_payment(day_payment);
//        newSalary.setStart_date(start_date);
//        newSalary.setEnd_date(end_date);
//        newSalary.setTotal_working_days(total_working_days);
//        newSalary.setSalary(salary);
//        newSalary.setSalary_paid_date(salary_paid_date);
//        return salaryRepository.save(newSalary);
//    }
    @GetMapping("/salaryGet")
    List<Salary> getAllSalaries(){
        return salaryRepository.findAll();
    }

    @DeleteMapping("/salaryDelete/{salaryId}")
    String deleteSalary(@PathVariable Long salaryId){
        if (!salaryRepository.existsById(salaryId)){
            throw new SalaryNotFoundException(salaryId);
        }
        salaryRepository.deleteById(salaryId);
        return "Salary detail with ID "+salaryId+"has been deleted Succesfully";
    }

//    @GetMapping("/calculateSalaries")
//    public ResponseEntity<String> calculateAndSaveSalaries(
//            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
//            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
//
//        List<Object[]> salaryDetails = salaryService.getEstateWorkersSalary(startDate, endDate);
//        salaryService.saveCalculatedSalaries(salaryDetails);
//
//        return ResponseEntity.status(HttpStatus.OK).body("Salaries calculated and saved successfully");
//    }
}

