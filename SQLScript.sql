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

