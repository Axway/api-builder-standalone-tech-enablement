USE productdb;
 
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    sku nvarchar(255),
    name nvarchar(255),
    description nvarchar(255),
    PRIMARY KEY(id)
);
 
INSERT INTO products
VALUES ('1', 'SKU1', 'Spicy World Peppercorn', 'If we had to select just one spice to flavor our food, pepper, the master spice ,would be a wise choice.');
 
INSERT INTO products
VALUES ('2', 'SKU2', 'VAHDAM', 'Green Tea Leaves. The Himalayan region is blessed with one-of-a-kind soil type and combined with its presence near the Tropic of Cancer and the climatic conditions are ideal for the cultivation of tea.');
 
INSERT INTO products
VALUES ('3', 'SKU3', 'Rani Garam Masala', 'Traditionally from Northern Indian, garam masala is a staple spice in Indian cookery. Garam, when translated means “warm” best describes the properties of the blend. ');