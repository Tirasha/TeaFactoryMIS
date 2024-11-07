create database TeaFactoryMIS;
use TeaFactoryMIS;


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
-- drop table fuel; 
Create Table vehicle(
	vehicle_No varchar(50) primary key not null,
    vehicle_type varchar(255) not null,
    vehicle_image LONGBLOB not null,
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
('VH004', 'Bus', LOAD_FILE('D:/TeaFactory/TeaFactoryMIS/Images/bus.jpg'), 'In Service', 'F003'),
('VH005', 'Van', LOAD_FILE('D:/TeaFactory/TeaFactoryMIS/Images/van.jpg'), 'Available', 'F002');

Insert into machine (machine_id, machine_type, machine_quantity, machine_availability, fuel_id) Values 
('MCH001', 'Excavator', '5', 'Available', 'F001'),
('MCH002', 'Bulldozer', '3', 'In Service', 'F002'),
('MCH003', 'Crane', '2', 'Available', 'F003'),
('MCH004', 'Forklift', '10', 'Under Maintenance', 'F001'),
('MCH005', 'Loader', '7', 'Available', 'F002');

Insert into fuel (fuel_id, fuel_name, fuel_type, fuel_quantity) Values 
('F001', 'Diesel', 'Liquid', '5000 liters'),
('F002', 'Petrol', 'Liquid', '3000 liters'),
('F003', 'Electricity', 'Electric', '2000 kWh'),
('F004', 'Natural Gas', 'Gas', '1500 cubic meters'),
('F005', 'Hydrogen', 'Gas', '1000 cubic meters');

-- Indexing
CREATE INDEX idx_fuel_name ON fuel(fuel_name);

-- View
-- DROP table All_vehicles; 
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


-- Triggers
-- Delimiter $$
-- CREATE TRIGGER trigger_update_fuel_quantity_on_machine_update
-- BEFORE UPDATE ON machine                           
-- FOR EACH ROW
-- BEGIN
--     IF OLD.fuel_id <> NEW.fuel_id THEN
--         -- Decrease quantity from the old fuel_id
--         UPDATE fuel
--         SET fuel_quantity = fuel_quantity + OLD.machine_quantity
--         WHERE fuel_id = OLD.fuel_id;

--         -- Increase quantity in the new fuel_id
--         UPDATE fuel
--         SET fuel_quantity = fuel_quantity - NEW.machine_quantity
--         WHERE fuel_id = NEW.fuel_id;
--     END IF;
-- END;
-- Delimiter ;

-- UPDATE machine
-- SET fuel_id = 'F002', machine_quantity = 10
-- WHERE machine_id = 'M001';







insert into users(user_id,password,username,emp_id)values
("u001", "12345", "Isuru","e001"),
("u002", "12345", "Madhu","e002"),
("u003", "12345", "Hiru","e003"),
("u004", "12345", "Tirasha","e004"),
("u005", "12345", "Tharu","e005");

