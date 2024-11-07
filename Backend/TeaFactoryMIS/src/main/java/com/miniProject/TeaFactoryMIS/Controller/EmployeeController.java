package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Repository.EmployeeRepository;
import com.miniProject.TeaFactoryMIS.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Create an employee
    @PostMapping("/create")
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        try {
            Employee savedEmployee = employeeRepository.save(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("Employee with this NIC already exists.");
        }
    }

    // Get all employees
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(employees);
    }

    @Transactional
    @GetMapping("/{empId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String empId) {
        Employee employee = employeeRepository.spGetDetailsByEmpID(empId);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
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


    // Get labour employees (drying employees)
    @GetMapping("/labour")
    public ResponseEntity<List<Employee>> getDryingEmployees() {
        String sql = "SELECT emp_id, firstname, lastname, house_no, line_no, nic, category, role FROM estate_employees_view";
        List<Employee> dryingEmployees = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Employee employee = new Employee();
            employee.setEmpId(rs.getString("emp_id"));  // Add emp_id
            employee.setFirstname(rs.getString("firstname"));
            employee.setLastname(rs.getString("lastname"));
            employee.setHouseNo(rs.getString("house_no"));
            employee.setLineNo(rs.getString("line_no"));
            employee.setNic(rs.getString("nic"));  // Add nic
            employee.setCategory(rs.getString("category"));
            employee.setRole(rs.getString("role"));
            return employee;
        });
        return ResponseEntity.ok(dryingEmployees);
    }




}
