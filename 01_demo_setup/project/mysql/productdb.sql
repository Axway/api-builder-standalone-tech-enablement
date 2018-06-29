USE productdb;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    sku nvarchar(255),
    name nvarchar(255),
    description nvarchar(255),
    PRIMARY KEY(id)
);

INSERT INTO products
VALUES ('1', 'API Builder', 'product-service', 'This service is part of the API Builder demo services.');

INSERT INTO products
VALUES ('2', 'API Builder', 'review-service', 'This service is part of the API Builder demo services.');

INSERT INTO products
VALUES ('3', 'API Builder', 'aggregation-service', 'This service is part of the API Builder demo services.');