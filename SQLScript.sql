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
CREATE INDEX index_vehicle_fuel_id ON vehicle(fuel_id);
CREATE INDEX index_machine_availability ON machine(machine_availability);
CREATE INDEX index_fuel_name ON fuel(fuel_name);

-- View
CREATE VIEW available_vehicles AS
SELECT vehicle_No, vehicle_type, fuel_id
FROM vehicle
WHERE vehicle_availability = 'Available';

SELECT * FROM available_vehicles;

CREATE VIEW machine_fuel_details AS
SELECT m.machine_id, m.machine_type, m.machine_quantity, f.fuel_name, f.fuel_type, f.fuel_quantity
FROM machine m
JOIN fuel f ON m.fuel_id = f.fuel_id;

SELECT * FROM machine_fuel_details;


-- Function
Delimiter $$
CREATE FUNCTION GetTotalMachineQuantity(m_type VARCHAR(255))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total_quantity INT;
    SELECT SUM(machine_quantity) INTO total_quantity
    FROM machine
    WHERE machine_type = m_type;
    RETURN IFNULL(total_quantity, 0); -- Returns 0 if no machines of the type exist
END;
Delimiter ;

SELECT GetTotalMachineQuantity('Excavator');


-- Procudure
Delimiter $$
CREATE PROCEDURE AddVehicle(
    IN v_vehicle_No VARCHAR(50),
    IN v_vehicle_type VARCHAR(255),
    IN v_vehicle_image LONGBLOB,
    IN v_vehicle_availability VARCHAR(255),
    IN v_fuel_id VARCHAR(255)
)
BEGIN
    INSERT INTO vehicle (vehicle_No, vehicle_type, vehicle_image, vehicle_availability, fuel_id)
    VALUES (v_vehicle_No, v_vehicle_type, v_vehicle_image, v_vehicle_availability, v_fuel_id);
END;
Delimiter ;

CALL AddVehicle();

Delimiter $$
CREATE PROCEDURE UpdateFuelQuantity(
    IN f_fuel_id VARCHAR(50),
    IN f_new_quantity VARCHAR(255)
)
BEGIN
    UPDATE fuel
    SET machine_quantity = f_new_quantity
    WHERE machine_id = f_fuel_id;
END;
Delimiter ;

CALL UpdateFuelQuantity();


-- Stored Procudure
Delimiter $$
CREATE PROCEDURE GetAvailableVehiclesByType(
    IN v_vehicle_type VARCHAR(255)
)
BEGIN
    SELECT vehicle_No, vehicle_type, vehicle_availability, fuel_id
    FROM vehicle
    WHERE vehicle_type = v_vehicle_type AND vehicle_availability = 'Available';
END;
Delimiter ;

CALL GetAvailableVehiclesByType();


-- Stored Procudure with error handling
Delimiter $$
CREATE PROCEDURE ReduceFuelQuantityWithErrorHandling(
    IN f_fuel_id VARCHAR(50),
    IN f_reduce_amount INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error: Failed to update fuel quantity. Please check inputs.' AS ErrorMessage;
    END;

    START TRANSACTION;

    -- Check if the fuel_id exists and if sufficient quantity is available
    IF EXISTS (SELECT 1 FROM fuel WHERE fuel_id = f_fuel_id) THEN
        DECLARE current_quantity INT;
        SELECT fuel_quantity INTO current_quantity FROM fuel WHERE fuel_id = f_fuel_id;

        IF current_quantity >= f_reduce_amount THEN
            UPDATE fuel
            SET fuel_quantity = fuel_quantity - f_reduce_amount
            WHERE fuel_id = f_fuel_id;
            COMMIT;
        ELSE
            ROLLBACK;
            SELECT 'Error: Insufficient fuel quantity available.' AS ErrorMessage;
        END IF;
    ELSE
        ROLLBACK;
        SELECT 'Error: Specified fuel_id does not exist.' AS ErrorMessage;
    END IF;
END;
Delimiter ;

CALL ReduceFuelQuantityWithErrorHandling();


-- Triggers
Delimiter $$
CREATE TRIGGER trigger_update_fuel_quantity_on_machine_update
BEFORE UPDATE ON machine                           
FOR EACH ROW
BEGIN
    IF OLD.fuel_id <> NEW.fuel_id THEN
        -- Decrease quantity from the old fuel_id
        UPDATE fuel
        SET fuel_quantity = fuel_quantity + OLD.machine_quantity
        WHERE fuel_id = OLD.fuel_id;

        -- Increase quantity in the new fuel_id
        UPDATE fuel
        SET fuel_quantity = fuel_quantity - NEW.machine_quantity
        WHERE fuel_id = NEW.fuel_id;
    END IF;
END;
Delimiter ;

UPDATE machine
SET fuel_id = 'F002', machine_quantity = 10
WHERE machine_id = 'M001';







insert into users(user_id,password,username,emp_id)values
("u001", "12345", "Isuru","e001"),
("u002", "12345", "Madhu","e002"),
("u003", "12345", "Hiru","e003"),
("u004", "12345", "Tirasha","e004"),
("u005", "12345", "Tharu","e005");

