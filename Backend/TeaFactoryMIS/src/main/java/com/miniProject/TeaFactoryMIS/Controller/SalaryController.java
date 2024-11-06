package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.EpfEtfNotFoundException;
import com.miniProject.TeaFactoryMIS.Exception.SalaryNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.SalaryRepository;
import com.miniProject.TeaFactoryMIS.model.Salary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SalaryController {
    @Autowired
    private SalaryRepository salaryRepository;

    @PostMapping("/salaryAdd")
    public Salary newSalary(@RequestBody Salary newSalary){
        return salaryRepository.save(newSalary);
    }

    @GetMapping("/salaryGetAll")
    List<Salary> getAllSalary(){
        return salaryRepository.findAll();
    }

    @DeleteMapping("/deleteMApping/{salaryId")
    String deleteSalary(@PathVariable String salaryId){
        if (!salaryRepository.existsById(salaryId)){
            throw new SalaryNotFoundException(salaryId);
        }
        else {
            salaryRepository.deleteById(salaryId);
        }
        return "Salary detail with ID "+salaryId+"has been deleted Succesfully";

    }
}
