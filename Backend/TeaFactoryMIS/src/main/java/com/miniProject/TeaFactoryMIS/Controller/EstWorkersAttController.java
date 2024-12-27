package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Repository.EmployeeRepository;
import com.miniProject.TeaFactoryMIS.model.Employee;
import com.miniProject.TeaFactoryMIS.model.EstateWorkersAttendance;
import com.miniProject.TeaFactoryMIS.Repository.EstWorkersAttRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EstWorkersAttController {

    @Autowired
    private EstWorkersAttRepository attendanceRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addAttendance(@RequestBody EstateWorkersAttendance attendance) {
        try {
            // Check if employee exists by ID and set the employee relationship
            Employee employee = employeeRepository.findById(attendance.getEmployee().getEmpId())
                    .orElseThrow(() -> new RuntimeException("Employee with ID " + attendance.getEmployee().getEmpId() + " not found"));

            // Set the employee for the attendance record
            attendance.setEmployee(employee);

            // Save the attendance record
            EstateWorkersAttendance savedAttendance = attendanceRepository.save(attendance);

            return ResponseEntity.ok(savedAttendance);
        } catch (DataIntegrityViolationException e) {
            // Handle the trigger violation (custom error message from trigger)
            return ResponseEntity.badRequest().body("Failed to add attendance record: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }




    // Get all attendance records
    @GetMapping("/all")
    public ResponseEntity<List<EstateWorkersAttendance>> getAllAttendance() {
        List<EstateWorkersAttendance> attendanceList = attendanceRepository.findAll();
        return ResponseEntity.ok(attendanceList);
    }


    // Generate the next attendance ID
    @GetMapping("/nextId")
    public ResponseEntity<String> getNextAttendanceId() {
        List<EstateWorkersAttendance> attendances = attendanceRepository.findAll();

        String nextId;
        if (attendances.isEmpty()) {
            nextId = "att001"; // Start from att001 if no attendance records exist
        } else {
            attendances.sort((a1, a2) -> a2.getAttId().compareTo(a1.getAttId())); // Sort descending by ID
            String lastId = attendances.get(0).getAttId();
            int newIdNum = Integer.parseInt(lastId.substring(3)) + 1; // Increment number part
            nextId = "att" + String.format("%03d", newIdNum); // Format as att002, att003, etc.
        }

        return ResponseEntity.ok(nextId);
    }

    // Get attendance by employee ID
    @GetMapping("/employee/{empId}")
    public ResponseEntity<List<EstateWorkersAttendance>> getAttendanceByEmployee(@PathVariable String empId) {
        List<EstateWorkersAttendance> attendance = attendanceRepository.findByEmployee_EmpId(empId);
        return ResponseEntity.ok(attendance);
    }

    // Get attendance by attendance ID
    @GetMapping("/{attId}")
    public ResponseEntity<EstateWorkersAttendance> getAttendanceById(@PathVariable String attId) {
        Optional<EstateWorkersAttendance> attendance = attendanceRepository.findById(attId);
        return attendance.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update attendance record
    @PutMapping("/update/{attId}")
    public ResponseEntity<EstateWorkersAttendance> updateAttendance(
            @PathVariable String attId,
            @RequestBody EstateWorkersAttendance updatedAttendance) {
        Optional<EstateWorkersAttendance> existingAttendance = attendanceRepository.findById(attId);
        if (existingAttendance.isPresent()) {
            EstateWorkersAttendance attendance = existingAttendance.get();
            attendance.setDate(updatedAttendance.getDate());
            attendance.setStatus(updatedAttendance.getStatus());
            attendance.setLeave_Reason(updatedAttendance.getLeave_Reason());
            attendance.setEmployee(updatedAttendance.getEmployee());
            EstateWorkersAttendance updated = attendanceRepository.save(attendance);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete an attendance record
    @DeleteMapping("/delete/{attId}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable String attId) {
        Optional<EstateWorkersAttendance> existingAttendance = attendanceRepository.findById(attId);
        if (existingAttendance.isPresent()) {
            attendanceRepository.deleteById(attId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<EstateWorkersAttendance>> filterAttendance(
            @RequestParam String empId,
            @RequestParam int year,
            @RequestParam int month) {

        List<EstateWorkersAttendance> filteredAttendance = attendanceRepository.filterByEmpIdAndDate(empId, year, month);
        return ResponseEntity.ok(filteredAttendance);
    }

}
