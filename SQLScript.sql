create database TeaFactoryMIS;
use TeaFactoryMIS;


insert into employee(emp_id,category,dob,firstname,house_no,lastname,line_no,nic,role,image)values
("e001", "Administrator", "2000-12-04", "Isuru", "10", "Ganga", "160", "200012457898" , "Admin", null),
("e002", "HR", "2000-12-04", "Madhusha", "111", "Thiyagaraja", "120", "200085967485", "HRAssist", null),
("e003", "Technician", "2000-12-04", "Hirunisha", "15", "Nirmani", "10", "200096362514", "TechnicalAssist", null),
("e004", "InventoryAssist", "2000-12-04", "Tirasha", "15", "Dinuki", "45", "200085967425", "InventoryAssist",  null),
("e005", "SalesAssist", "2000-12-04", "Tharu", "78", "Rashmika", "74", "200074859625", "SalesAssist", null);

insert into users(user_id,password,username,emp_id)values
("u001", "12345", "Isuru","e001"),
("u002", "12345", "Madhu","e002"),
("u003", "12345", "Hiru","e003"),
("u004", "12345", "Tirasha","e004"),
("u005", "12345", "Tharu","e005");




create unique index idx_unique_nic on employee(nic);  
SHOW INDEXES FROM employee;
 

DELIMITER //
CREATE PROCEDURE spGetDetailsByEmpID(IN empid VARCHAR(255))
BEGIN
    SELECT * FROM employee e WHERE e.emp_id = empid; 
END //
DELIMITER ;


CREATE INDEX idx_attendance_filters ON estate_workers_attendance (date, status, emp_id);
SHOW INDEXES FROM estate_workers_attendance;


CREATE VIEW estate_employees_view AS
SELECT emp_id,firstname, lastname, house_no, line_no,nic, category, role
FROM employee
WHERE category = 'Labour';   


CREATE INDEX idx_empid_date ON Estate_Workers_Attendance(emp_id, date);




CREATE TABLE Log_table (
    notificationId INT AUTO_INCREMENT PRIMARY KEY,
    empId VARCHAR(50) NOT NULL,
    age INT
);

DELIMITER $$

CREATE TRIGGER after_employees_insert_trigger_table
AFTER INSERT ON Employee
FOR EACH ROW
BEGIN
    DECLARE calculated_age INT;

    -- Calculate age based on the employee's date of birth
    SET calculated_age = TIMESTAMPDIFF(YEAR, NEW.dob, CURDATE()) - 
                         (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(NEW.dob, '%m%d'));

    -- Insert the calculated age and empId into Log_table
    INSERT INTO Log_table (empId, age)
    VALUES (NEW.emp_id, calculated_age);
END $$

DELIMITER ;

-- Insert a new employee
INSERT INTO Employee (emp_id, category, dob, firstname, house_no, lastname, line_no, nic, role, image)
VALUES ('e012', 'Labour', '1988-11-08', 'Alice', '124', 'Smith', '457', '880987654321', 'grinding', null);

-- View the Employee table
SELECT * FROM Employee;

-- View the Log_table to check the inserted log record
SELECT * FROM Log_table;






















