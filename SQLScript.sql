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

insert into basics(basic_id,role,basic_amount,day_payment)values
(1,"HR manager",85000.00,0),
(2,"HR assist", 45000.00,0),
(3,"Estate workers",0,900.00);

