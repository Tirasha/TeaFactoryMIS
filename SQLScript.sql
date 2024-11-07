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




