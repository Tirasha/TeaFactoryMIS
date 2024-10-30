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
