
CREATE DATABASE IF NOT EXISTS SDC;

USE SDC;


-- ---
-- Table 'Products'
--
-- ---
DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
  product_id INTEGER  AUTO_INCREMENT,
  _name VARCHAR(20),
  slogan VARCHAR(50),
  _description VARCHAR(100),
  category VARCHAR(30),
  default_price INTEGER,
  PRIMARY KEY (product_id)
);

-- ---
-- Table 'Products'
--
-- ---

DROP TABLE IF EXISTS Reviews;

CREATE TABLE Reviews (
  review_id INTEGER  AUTO_INCREMENT,
  rating INTEGER,
  summary VARCHAR(100),
  recommend BOOLEAN,
  reported BOOLEAN,
  response  VARCHAR(100),
  body VARCHAR(1000),
  date DATE,
  reviewer_name VARCHAR(50),
  helpfulness INTEGER,
  product_id INTEGER,
  reviewer_email VARCHAR(50),
  PRIMARY KEY (review_id),
  FOREIGN KEY (product_id) REFERENCES Products (product_id)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
  photo_id INTEGER  AUTO_INCREMENT,
  reviewId INTEGER,
  _url VARCHAR(200),
  PRIMARY KEY (photo_id),
  FOREIGN KEY (reviewId) REFERENCES Reviews (review_id)
);

-- ---
-- Table 'ReviewPhotos'
--
-- ---

DROP TABLE IF EXISTS ReviewPhotos;

CREATE TABLE ReviewPhotos (
  id INTEGER  AUTO_INCREMENT,
  reviewId INTEGER,
  photoId INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (reviewId) REFERENCES Reviews (review_id),
  FOREIGN KEY (photoId) REFERENCES Photos (photo_id)
);


-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS Characteristics;

CREATE TABLE Characteristics (
  characteristic_id INTEGER  AUTO_INCREMENT,
  product_id INTEGER,
  _name VARCHAR(30),
  PRIMARY KEY (characteristic_id)
);

-- ---
-- Table 'ReviewCharacteristics'
--
-- ---

DROP TABLE IF EXISTS ReviewCharacteristics;

CREATE TABLE ReviewCharacteristics (
  id INTEGER  AUTO_INCREMENT,
  reviewId INTEGER,
  charId INTEGER,
  value DECIMAL,
  PRIMARY KEY (id),
  FOREIGN KEY (reviewId) REFERENCES Reviews (review_id),
  FOREIGN KEY (charId) REFERENCES Characteristics (characteristic_id)
);

-- ETL

-- Products

LOAD DATA LOCAL INFILE '/Volumes/Bastilla/SDC Data/product.csv' INTO TABLE Products
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
product_id,
_name,
slogan,
_description,
category,
default_price
);

-- Reviews

LOAD DATA LOCAL INFILE '/Volumes/Bastilla/SDC Data/reviews.csv' INTO TABLE Reviews
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
review_id,
product_id,
rating,
date,
summary,
body,
recommend,
reported,
reviewer_name,
reviewer_email,
response,
helpfulness
)
set date = DATE_FORMAT(date,'%Y/%c/%e');

-- Photos

LOAD DATA LOCAL INFILE '/Volumes/Bastilla/SDC Data/reviews_photos.csv' INTO TABLE Photos
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
  photo_id,
  reviewId,
  _url
);

LOAD DATA LOCAL INFILE '/Volumes/Bastilla/SDC Data/characteristics.csv' INTO TABLE Characteristics
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
  characteristic_id,
  product_id,
  _name
);