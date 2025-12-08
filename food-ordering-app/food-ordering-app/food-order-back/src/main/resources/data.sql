insert into foodorderdb.user (id, address, deleted, email, first_name, last_name, password, phone_number, role, username) values (1, "ABC road, XYZ city, 444444", false, "yogita@gmail.com", "Yogita", "Mohite", "123", "8888888888", 1, "yogita");
insert into foodorderdb.user (id, address, deleted, email, first_name, last_name, password, phone_number, role, username) values (2, "Sgmcollege karad 788882", false, "vedika@gmail.com", "Vedika", "Jagtap", "123", "7777777777", 0, "vedika");
insert into foodorderdb.user (id, address, deleted, email, first_name, last_name, password, phone_number, role, username) values (3, "karad 434342", false, "pragati@gmail.com", "Pragati", "Jadhav", "123", "9999999999", 2, "pragati");

insert into foodorderdb.meal_type (id, type_name) values (1, "PIZZA");
insert into foodorderdb.meal_type (id, type_name) values (2, "MAIN COURSE");
insert into foodorderdb.meal_type (id, type_name) values (3, "SALAD");
insert into foodorderdb.meal_type (id, type_name) values (4, "PANCAKE");
insert into foodorderdb.meal_type (id, type_name) values (5, "BURGER");
insert into foodorderdb.meal_type (id, type_name) values (6, "PASTA");

insert into foodorderdb.meal (id, name, price, meal_type_id) values (1, "CAPRICCIOSA", 600, 1);
insert into foodorderdb.meal (id, name, price, meal_type_id) values (2, "SLATKA PALACINKA", 600, 4);
insert into foodorderdb.meal (id, name, price, meal_type_id) values (3, "RUSKA SALATA", 600, 3);
insert into foodorderdb.meal (id, name, price, meal_type_id) values (4, "NESTOOO", 600, 3);