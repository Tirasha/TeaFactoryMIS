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

select * from inventory;


-- get the total tock of available tea stock from tea inventory
DELIMITER //

CREATE PROCEDURE Tea_Stock_Summary(OUT total_Tea_stock FLOAT)
BEGIN
    SELECT SUM(available_stock) INTO total_Tea_stock FROM inventory;
END //
DELIMITER ;


CALL Tea_Stock_Summary(@total_Tea_stock);
SELECT @total_Tea_stock AS TotalTeaStock;
drop procedure Tea_Stock_Summary;


-- view to get type and stock of tea
CREATE VIEW Tea_Stock_Summary AS
SELECT tea_type, available_stock
FROM inventory;

drop view Tea_Stock_Summary;
select * from Tea_Stock_Summary;

-- view to get the fertilizer name and quntity
CREATE VIEW  Fertilizer_Summary AS
	select name,quantity from fertilizer;
    
select * from Fertilizer_Summary;

-- triger for delete tea

delimiter //
create trigger delete_history_tea
after delete 
on inventory for each row
begin
insert into delete_history_tea(inventory_id,tea_type,available_stock,price_per_kg,deleted_time) 
values (old.inventory_id,old.tea_type,old.available_stock,old.price_per_kg, now());
end //
delimiter ;

drop trigger delete_history_tea;
delete from inventory where inventory_id='inv005';
select * from delete_history_tea;

-- delete trigger for fertilizer 

delimiter //
create trigger delete_history_fertilizer
after delete 
on fertilizer for each row
begin
insert into deleted_fertilizer_history(fer_id,name,quantity,deleted_time) 
values (old.fer_id,old.name,old.quantity, now());
end //
delimiter ;

drop trigger delete_history_fertilizer;
delete from fertilizer where fer_id='fer002';
select * from deleted_fertilizer_history;


INSERT INTO inventory(inventory_id,available_stock,price_per_kg,type) VALUES
('I001', 26, 300, 'Pekoe'),
('I002', 95, 600, 'B.O.P'),
('I003', 183, 100, 'B.O.P.F');

INSERT INTO deleted_sales (history_id, deleted_at,inventory_id,sales_id,tea_type,tea_quantity) VALUES
(1, '2024-11-07 11:05:06.000000', 'I002', 'S003', 'B.O.P', 5),
(2, '2024-11-07 12:09:21.000000', 'I002', 'S006', 'B.O.P', 2),
(3, '2024-11-07 19:13:35.000000', 'I003', 'S007', 'B.O.P.F', 3);

INSERT INTO sales (sales_id, date,tea_type,tea_quantity,total_amount,inventory_id) VALUES
('S001', '2024-10-06 05:30:00.000000', 'Pekoe', 10, 3000, 'I001'),
('S002', '2024-11-10 09:08:35.653000', 'Pekoe', 17, 5100, 'I001'),
('S003', '2024-09-10 11:05:50.143000', 'Pekoe', 4, 1200, 'I001'),
('S004', '2024-08-07 11:06:14.710000', 'B.O.P', 7, 4200, 'I002'),
('S005', '2024-07-19 11:07:28.832000', 'B.O.P.F', 5, 500, 'I003'),
('S006', '2024-11-11 16:55:53.923000', 'B.O.P.F', 10, 1000, 'I003'),
('S008', '2024-11-07 16:58:04.717000', 'B.O.P', 6, 3600, 'I002'),
('S009', '2024-11-07 16:58:38.704000', 'Pekoe', 6, 1800, 'I001'),
('S010', '2024-11-07 17:03:00.931000', 'B.O.P', 5, 3000, 'I002');

create view ViewAllSales as 
select s.sales_id as salesId,
s.tea_type as teaType,
s.date,
s.tea_quantity as teaQuantity,
s.total_amount as totalAmount,
i.inventory_id as inventoryId,
i.available_stock as availableStock
from 
sales s join 
inventory i on s.inventory_id=i.inventory_id;


DELIMITER //

CREATE TRIGGER CalculateTotalAmountAndUpdateStock
BEFORE INSERT ON Sales
FOR EACH ROW
BEGIN
    DECLARE v_price_per_kg DOUBLE;
    DECLARE v_available_stock DOUBLE;

    
    SELECT price_per_kg, available_stock INTO v_price_per_kg, v_available_stock
    FROM Inventory
    WHERE inventory_id = NEW.inventory_id;

    SET NEW.Total_Amount = NEW.Tea_Quantity * v_price_per_kg;

   
    UPDATE Inventory
    SET available_stock = v_available_stock - NEW.Tea_Quantity
    WHERE inventory_id = NEW.inventory_id;
END //

DELIMITER ;






UPDATE Sales
SET tea_Quantity = 15
WHERE sales_id= 'S001';

drop trigger update_sales_before_update;
select * from Sales;
select * from Inventory;

DELIMITER $$

CREATE TRIGGER update_sales_and_inventory
BEFORE UPDATE ON Sales
FOR EACH ROW
BEGIN

    DECLARE old_tea_quantity DOUBLE;
    DECLARE new_tea_quantity DOUBLE;
	SET old_tea_quantity = OLD.tea_Quantity;
    SET new_tea_quantity = NEW.tea_Quantity;
    SET NEW.total_Amount = NEW.tea_Quantity * (SELECT price_per_kg FROM Inventory WHERE inventory_id = NEW.inventory_id);
    IF new_tea_quantity > old_tea_quantity THEN
	UPDATE Inventory
	SET available_stock = available_stock - (new_tea_quantity - old_tea_quantity)
	WHERE inventory_id = NEW.inventory_id;
    ELSE
	UPDATE Inventory SET available_stock = available_stock + (old_tea_quantity - new_tea_quantity)
	WHERE inventory_id = NEW.inventory_id;
    END IF;
END$$
DELIMITER ;







DELIMITER $$

CREATE TRIGGER before_sales_delete
BEFORE DELETE ON Sales
FOR EACH ROW
BEGIN
    INSERT INTO deleted_sales(sales_id, tea_type, tea_quantity, inventory_id, deleted_at)
    VALUES (OLD.sales_id, OLD.tea_type, OLD.tea_quantity, OLD.inventory_id, NOW());
END $$

DELIMITER ;

ALTER TABLE deleted_sales MODIFY history_id INT NOT NULL DEFAULT 0;
UPDATE deleted_sales SET deleted_saleshistory_id = 0 WHERE history_id IS NULL;

drop table deleted_sales;

drop trigger before_sales_delete;


ALTER TABLE deleted_sales MODIFY history_id INT AUTO_INCREMENT NOT NULL;




