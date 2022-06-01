Drop DATABASE postgres

CREATE DATABASE postgres

create table product_details( 
  id serial PRIMARY key, 
  product_name VARCHAR(255),
  original_price_g INT,
  weight_g INT,
  description VARCHAR(255),
  image VARCHAR(255),
  pet_name VARCHAR(255),
  sold INT,
  brand_name varchar(255),
  is_active BOOLEAN DEFAULT true
);

-- Drop table product_details;


create table users (
  id serial PRIMARY key, 
  name VARCHAR(255),
  password VARCHAR(255),
  image VARCHAR(255),
  gender VARCHAR(255),
  date_of_birth TIMESTAMP, 
  created_at TIMESTAMP, 
  update_at TIMESTAMP,
  is_Admin BOOLEAN DEFAULT FALSE
);

-- insert Admin information 

INSERT INTO users (name,password,is_Admin) VALUES ('adminMax','admin1234567', true);


create TABLE cart_products(
  id SERIAL Primary key,
  product_name VARCHAR(255),
  original_price_g INT,
  description VARCHAR(255),
  image VARCHAR(255),
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id)
  );


-- DROP TABLE cart_products;


create table interaction(
  id SERIAL Primary key,
  like_number int DEFAULT 0,
  product_id int,
  FOREIGN KEY (product_id) REFERENCES product_details(id)
);

-- DROP TABLE interaction

CREATE TABLE comments(
  id SERIAL PRIMARY key,
  content VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  user_name VARCHAR(255),
  user_id int,
  product_id int,
  FOREIGN key (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES product_details(id)
);

-- DROP TABLE comments


create TABLE histories(
  id SERIAL Primary key,
  product_name VARCHAR(255),
  original_price_g INT,
  description VARCHAR(255),
  image VARCHAR(255),
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id)
  );

-- DROP TABLE histories;
-- TRUNCATE TABLE cart_products;


