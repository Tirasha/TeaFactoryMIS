package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.model.Employee;
import com.miniProject.TeaFactoryMIS.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create an employee
    @PostMapping("/create")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    // Get all employees
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(employees);
    }

    // Get an employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an employee by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String id, @RequestBody Employee employeeDetails) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);

        if (employeeOptional.isPresent()) {
            Employee employeeToUpdate = employeeOptional.get();
            employeeToUpdate.setFirstname(employeeDetails.getFirstname());
            employeeToUpdate.setLastname(employeeDetails.getLastname());
            employeeToUpdate.setDob(employeeDetails.getDob());
            employeeToUpdate.setHouseNo(employeeDetails.getHouseNo());
            employeeToUpdate.setLineNo(employeeDetails.getLineNo());
            employeeToUpdate.setNic(employeeDetails.getNic());
            employeeToUpdate.setCategory(employeeDetails.getCategory());
            employeeToUpdate.setRole(employeeDetails.getRole());
            employeeToUpdate.setImage(employeeDetails.getImage());

            Employee updatedEmployee = employeeRepository.save(employeeToUpdate);
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an employee by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable String id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get the next available employee ID
    @GetMapping("/nextId")
    public ResponseEntity<String> getNextEmployeeId() {
        List<Employee> employees = employeeRepository.findAll();

        String nextId;
        if (employees.isEmpty()) {
            nextId = "e001"; // Start from e001 if no employees exist
        } else {
            employees.sort((e1, e2) -> e2.getEmpId().compareTo(e1.getEmpId())); // Sort descending by ID
            String lastId = employees.get(0).getEmpId();
            int newIdNum = Integer.parseInt(lastId.substring(1)) + 1; // Increment number
            nextId = "e" + String.format("%03d", newIdNum); // Format as e006, e007, etc.
        }

        return ResponseEntity.ok(nextId);
    }
}
