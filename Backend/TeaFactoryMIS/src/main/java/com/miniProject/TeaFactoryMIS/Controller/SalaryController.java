package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.BasicNotFoundException;
import com.miniProject.TeaFactoryMIS.Exception.EpfEtfNotFoundException;
import com.miniProject.TeaFactoryMIS.Exception.SalaryNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.SalaryRepository;
import com.miniProject.TeaFactoryMIS.Service.SalaryService;
import com.miniProject.TeaFactoryMIS.model.Basics;
import com.miniProject.TeaFactoryMIS.model.Salary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SalaryController {
    @Autowired
    private SalaryRepository salaryRepository;
    @Autowired
    private SalaryService salaryService;

    @PostMapping("/salaryAdd")
    public Salary newSalary(@RequestBody Salary newSalary){
        return salaryRepository.save(newSalary);
    }

    @GetMapping("/salaryGet")
    List<Salary> getAllSalaries(){
        return salaryRepository.findAll();
    }

    @DeleteMapping("/salaryDelete/{salaryId}")
    String deleteSalary(@PathVariable String salaryId){
        if (!salaryRepository.existsById(salaryId)){
            throw new BasicNotFoundException(salaryId);
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

