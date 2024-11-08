package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.model.FactoryWorkersAttendance;
import com.miniProject.TeaFactoryMIS.model.Employee;
import com.miniProject.TeaFactoryMIS.Repository.FacWorkersAttRepository;
import com.miniProject.TeaFactoryMIS.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/factoryAttendance") // Correct API path for all endpoints
public class FacWorkersAttController {

    @Autowired
    private FacWorkersAttRepository facWorkersAttRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Add a new attendance record
    @PostMapping("/add")
    public ResponseEntity<?> addAttendance(@RequestBody FactoryWorkersAttendance attendance) {
        try {
            // Check if employee exists by ID and set the employee relationship
            Employee employee = employeeRepository.findById(attendance.getEmployee().getEmpId())
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            // Set the employee for the attendance record
            attendance.setEmployee(employee);

            // Save the attendance record
            FactoryWorkersAttendance savedAttendance = facWorkersAttRepository.save(attendance);

            return ResponseEntity.ok(savedAttendance);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("Failed to add attendance record due to data integrity violation.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all factory worker attendance records
    @GetMapping("/all")
    public ResponseEntity<List<FactoryWorkersAttendance>> getAllFactoryWorkersAttendance() {
        List<FactoryWorkersAttendance> attendanceList = facWorkersAttRepository.findAll();
        return ResponseEntity.ok(attendanceList);
    }

    // Generate the next attendance ID
    @GetMapping("/nextId")
    public ResponseEntity<String> getNextAttendanceId() {
        List<FactoryWorkersAttendance> attendances = facWorkersAttRepository.findAll();

        String nextId;
        if (attendances.isEmpty()) {
            nextId = "fac001"; // Start from fac001 if no attendance records exist
        } else {
            attendances.sort((a1, a2) -> a2.getAttId().compareTo(a1.getAttId())); // Sort descending by ID
            String lastId = attendances.get(0).getAttId();
            int newIdNum = Integer.parseInt(lastId.substring(3)) + 1; // Increment number part
            nextId = "fac" + String.format("%03d", newIdNum); // Format as fac002, fac003, etc.
        }

        return ResponseEntity.ok(nextId);
    }

    // Get attendance by employee ID
    @GetMapping("/employee/{empId}")
    public ResponseEntity<List<FactoryWorkersAttendance>> getAttendanceByEmployee(@PathVariable String empId) {
        List<FactoryWorkersAttendance> attendance = facWorkersAttRepository.findByEmployee_EmpId(empId);
        return ResponseEntity.ok(attendance);
    }

    // Get attendance by attendance ID
    @GetMapping("/{attId}")
    public ResponseEntity<FactoryWorkersAttendance> getAttendanceById(@PathVariable String attId) {
        Optional<FactoryWorkersAttendance> attendance = facWorkersAttRepository.findById(attId);
        return attendance.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete an attendance record
    @DeleteMapping("/delete/{attId}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable String attId) {
        Optional<FactoryWorkersAttendance> existingAttendance = facWorkersAttRepository.findById(attId);
        if (existingAttendance.isPresent()) {
            facWorkersAttRepository.deleteById(attId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
