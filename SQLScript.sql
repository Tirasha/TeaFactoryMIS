create database TeaFactoryMIS;
use TeaFactoryMIS;

drop database TeaFactoryMIS;
insert into employee(emp_id,category,dob,firstname,house_no,lastname,line_no,nic,role,image)values
("e001", "Administrator", "2000-12-04", "Isuru", "10", "Ganga", "160", "200012457898" , "Admin", null),
("e002", "HR", "2000-12-04", "Madhusha", "111", "Thiyagaraja", "120", "200085967485", "HRAssist", null),
("e003", "Technician", "2000-12-04", "Hirunisha", "15", "Nirmani", "10", "200096362514", "TechnicalAssist", null),
("e004", "InventoryAssist", "2000-12-04", "Tirasha", "15", "Dinuki", "45", "200085967425", "InventoryAssist",  null),
("e005", "SalesAssist", "2000-12-04", "Tharu", "78", "Rashmika", "74", "200074859625", "SalesAssist", null);

insert into users(user_id,password,username)values
("u001", "12345", "Isuru"),
("u002", "12345", "Madhu"),
("u003", "12345", "Hiru"),
("u004", "12345", "Tirasha"),
("u005", "12345", "Tharu");




-- Tharu
-- Database Queries related to vehicle, machine and fuel tables
-- drop table vehicle; 
Create Table vehicle(
	vehicle_No varchar(50) primary key not null,
    vehicle_type varchar(255) not null,
    vehicle_image BLOB not null,
    vehicle_availability varchar(255) not null,
    fuel_id varchar(255) not null,
    FOREIGN KEY (fuel_id) REFERENCES fuel(fuel_id)
);

Create table machine(
	machine_id varchar(50) primary key not null,
    machine_type varchar(255) not null,
    machine_quantity varchar(255) not null,
    machine_availability varchar(255) not null,
    fuel_id varchar(255) not null,
    FOREIGN KEY (fuel_id) REFERENCES fuel(fuel_id)
);

Create table fuel(
	fuel_id varchar(50) primary key not null,
    fuel_name varchar(255) not null,
    fuel_type varchar(255) not null,
    fuel_quantity varchar(255) not null
);

Insert into vehicle (vehicle_No, vehicle_type, vehicle_image, vehicle_availability, fuel_id) Values 
('VH001', 'Car', LOAD_FILE('D:/TeaFactory/TeaFactoryMIS/Images/car.jpg'), 'Available', 'F001'),
('VH002', 'Truck', LOAD_FILE('D:/TeaFactory/TeaFactoryMIS/Images/truck.jpg'), 'Not Available', 'F002'),
('VH003', 'Motorcycle', LOAD_FILE('D:/TeaFactory/TeaFactoryMIS/Images/motorcycle.jpg'), 'Available', 'F001'),
('VH004', 'Bus', LOAD_FILE('D:/TeaFactory/TeaFactoryMIS/Images/bus.jpg'), 'Not Available', 'F003'),
('VH005', 'Van', LOAD_FILE('D:/TeaFactory/TeaFactoryMIS/Images/van.jpg'), 'Available', 'F002');

Insert into machine (machine_id, machine_type, machine_quantity, machine_availability, fuel_id) Values 
('MCH001', 'Withering Troughs', '5', 'Available', 'F001'),
('MCH002', 'Roller Machines ', '6', 'Available', 'F002'),
('MCH003', 'Fermentation Units ', '5', 'Available', 'F003'),
('MCH004', 'Dryers ', '7', 'Available', 'F001'),
('MCH005', 'Grading Machines ', '6', 'Available', 'F002');

Insert into fuel (fuel_id, fuel_name, fuel_type, fuel_quantity) Values 
('F001', 'Diesel', 'Liquid', '5000 liters'),
('F002', 'Petrol', 'Liquid', '3000 liters'),
('F003', 'Electricity', 'Electric', '2000 kWh'),
('F004', 'Natural Gas', 'Gas', '1500 cubic meters'),
('F005', 'Hydrogen', 'Gas', '1000 cubic meters');

-- Indexing
CREATE INDEX idx_fuel_name ON fuel(fuel_name); 
DESC fuel;

-- View
-- drop view technical_dashboard_counts;
CREATE VIEW All_vehicles AS
SELECT vehicle.vehicle_No, vehicle.vehicle_type, vehicle.vehicle_image, vehicle.vehicle_availability, fuel.fuel_name
FROM vehicle
JOIN fuel ON vehicle.fuel_id = fuel.fuel_id;

SELECT * FROM All_vehicles;

CREATE VIEW All_machines As
SELECT machine.machine_id, machine.machine_type, machine.machine_quantity, machine.machine_availability, fuel.fuel_name
FROM machine
JOIN fuel ON machine.fuel_id = fuel.fuel_id;

SELECT * FROM All_machines;

CREATE VIEW technical_dashboard_counts AS
SELECT 
    (SELECT COUNT(*) FROM vehicle) AS vehicleCount,
    (SELECT COUNT(*) FROM machine) AS machineTypeCount,
    (SELECT COUNT(*) FROM fuel) AS fuelTypeCount;

SELECT * FROM technical_dashboard_counts;


-- Triggers
Delimiter $$
CREATE TRIGGER insert_vehicle
AFTER INSERT ON vehicle
FOR EACH ROW
BEGIN
    INSERT INTO vehicle ( vehicle_No, vehicle_type, vehicle_image, vehicle_availability, fuel_id ) VALUES 
    ( NEW.vehicle_No, NEW.vehicle_type, NEW.vehicle_image, NEW.vehicle_availability, NEW.fuel_id );
END;
Delimiter ;

Delimiter $$
CREATE TRIGGER insert_machine
AFTER INSERT ON machine
FOR EACH ROW
BEGIN
    INSERT INTO machine ( machine_id, machine_type, machine_quantity, machine_availability, fuel_id ) VALUES 
    ( NEW.machine_id, NEW.machine_type, NEW.machine_quantity, NEW.machine_availability, NEW.fuel_id );
END;
Delimiter ;




insert into users(user_id,password,username,emp_id)values
("u001", "12345", "Isuru","e001"),
("u002", "12345", "Madhu","e002"),
("u003", "12345", "Hiru","e003"),
("u004", "12345", "Tirasha","e004"),
("u005", "12345", "Tharu","e005");

