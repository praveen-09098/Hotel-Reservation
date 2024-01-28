CREATE DATABASE IF NOT EXISTS deptasstmgmt;
USE deptasstmgmt;

CREATE TABLE assets
  (
     serialno         VARCHAR(10) NOT NULL,
     assetName        VARCHAR(50) NOT NULL,
     assetType        VARCHAR(50),
     initialCondition VARCHAR(50),
     purchaseDateId   VARCHAR(30),
     PRIMARY KEY (serialno)
  ); 


CREATE TABLE assetsassignment
  (
     assignmentId  INT(11) NOT NULL auto_increment,
     assetName     VARCHAR(50) NOT NULL,
     employeeName  VARCHAR(50) NOT NULL,
     returnDate    VARCHAR(50),
     isCheckIn     VARCHAR(10),
	 PRIMARY KEY (assignmentId)
  );
  

CREATE TABLE assetmaintenance
  (
     assetName      VARCHAR(50) NOT NULL,
     cost           VARCHAR(10),
     serviceDate    VARCHAR(20),
     serviceDetails VARCHAR(50)
  ); 
  
  
CREATE view assetmaintenanceview
AS
  SELECT assets.assetName,
         serviceDetails,
         serviceDate,
		 cost
  FROM   assets,
         assetmaintenance
  WHERE  assets.assetName = assetmaintenance.assetName;
  

CREATE view assetsassigned
AS
  SELECT employeeName,
         assets.assetName,
         returnDate,
         assignmentId,
         isCheckIn
  FROM   assetsassignment,
         assets
  WHERE  assetsassignment.assetName = assets.assetName;
  

-- Dummy data for assets table
INSERT INTO assets (serialno, assetName, assetType, initialCondition, purchaseDateId) VALUES 
('A123456789', 'Laptop', 'Electronics', 'New', '2022-01-01'),
('B987654321', 'Desk Chair', 'Furniture', 'Good', '2022-02-15'),
('C456789012', 'Printer', 'Electronics', 'Used', '2022-03-10'),
('D789012345', 'Conference Table', 'Furniture', 'New', '2022-04-20');

-- Dummy data for assetsassignment table
INSERT INTO assetsassignment (assetName, employeeName, returnDate, isCheckIn) VALUES 
('Laptop', 'Sumanth', '2022-02-01', 'Yes'),
('Desk Chair', 'Deepika', '2022-03-20', 'No'),
('Printer', 'Praveen', '2022-04-20', 'No'),
('Conference Table', 'Sumanth', '2022-05-05', 'Yes');

-- Dummy data for assetmaintenance table
INSERT INTO assetmaintenance (assetName, cost, serviceDate, serviceDetails) VALUES 
('Laptop', '50.00', '2022-02-10', 'Replaced battery'),
('Desk Chair', '30.00', '2022-04-05', 'Adjusted height'),
('Printer', '100.00', '2022-06-15', 'Repaired paper jam'),
('Conference Table', '75.00', '2022-08-20', 'Cleaned and inspected');


CREATE TABLE users (
  userid varchar(10) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(50) DEFAULT NULL,
  usertype varchar(50) DEFAULT NULL,
  PRIMARY KEY (userid)
);

INSERT INTO users (userid, username, password, usertype) VALUES
('100',	'Admin',	'Admin@123','ADMIN'),
('101',	'Deepika',	'user@123',	'EMPLOYEE'),
('102',	'Sumanth',	'user@123',	'EMPLOYEE'),
('103',	'Praveen',	'user@123',	'EMPLOYEE'),
('104',	'Admin2',	'Admin@123','ADMIN'),
('105',	'Employee4',	'user@123',	'EMPLOYEE');