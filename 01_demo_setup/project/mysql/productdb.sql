CREATE DATABASE productdb;

USE productdb;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    sku nvarchar(255),
    name nvarchar(255),
    description nvarchar(255),
    PRIMARY KEY(id)
);