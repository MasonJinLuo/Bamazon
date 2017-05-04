Drop Database Bamazon

CREATE DATABASE Bamazon;

use Bamazon

CREATE TABLE products(
item_id integer auto_increment not null,
product_name varchar(30) null,
department_name varchar(30) null,
price decimal(10, 2),
stock_quantity integer null,
primary key(item_id)
);


insert into products(product_name, department_name, price, stock_quantity)
values ("Action Figure", "Toys", 7.99, 9);

insert into products(product_name, department_name, price, stock_quantity)
values ("Teddy Bear", "Toys", 5.99, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("Lipstick", "Cosmetic", 2.99, 7);

insert into products(product_name, department_name, price, stock_quantity)
values ("Hair Gel", "Cosmetic", 3.99, 5);

insert into products(product_name, department_name, price, stock_quantity)
values ("Vitamins", "Health", 9.99, 9);

insert into products(product_name, department_name, price, stock_quantity)
values ("Ibuprofen", "Health", 12.99, 11);

insert into products(product_name, department_name, price, stock_quantity)
values ("Candy", "Food", 1.99, 20);

insert into products(product_name, department_name, price, stock_quantity)
values ("Milk", "Food", 5.99, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("Bread", "Food", 0.99, 15);

insert into products(product_name, department_name, price, stock_quantity)
values ("Eggs", "Food", 1.99, 15);

Select * from products; 
