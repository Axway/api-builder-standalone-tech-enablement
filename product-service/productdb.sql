CREATE DATABASE productdb;

USE productdb;

CREATE TABLE products(
    ID INT NOT NULL AUTO_INCREMENT,
    sku nvarchar(255),
    name nvarchar(255),
    PRIMARY KEY(ID)
);