create database TeaFactoryMIS;
use TeaFactoryMIS;

create table employee(
	emp_id varchar(255) primary key,
    firstname varchar(255),
    lastname varchar(255),
    house_no varchar(255),
    line_no varchar(255),
    dob date,
    nic varchar(255),
    category varchar(255),
    role varchar(255),
    image longblob,
    user_id varchar(255), foreign key(user_id) references user(user_id));
    
    
select * from employee;
desc employee;

insert into employee(emp_id,category,dob,firstname,house_no,lastname,line_no,nic,role,user_id)values
("e001", "Administrator", "2000-12-04", "Isuru", "10", "Ganga", "160", "200012457898" , "Admin", "u001"),
("e002", "HR", "2000-12-04", "Madhusha", "111", "Thiyagaraja", "120", "200085967485" "HRAssist", "u002"),
("e003", "Technician", "2000-12-04", "Hirunisha", "15", "Nirmani", "10", "200096362514", "TechnicalAssist", "u003"),
("e004", "InventoryAssist", "2000-12-04", "Tirasha", "15", "Dinuki", "45", "200085967425", "InventoryAssist", "u004"),
("e005", "SalesAssist", "2000-12-04", "Tharu", "78", "Rashmika", "74", "200074859625", "SalesAssist", "u005");

insert into users(user_id,password,username)values
("u001", "12345", "Isuru"),
("u002", "12345", "Madhu"),
("u003", "12345", "Hiru"),
("u004", "12345", "Tirasha"),
("u005", "12345", "Tharu");
