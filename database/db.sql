CREATE DATABASE bank_of_banks;

USE bank_of_banks;

--USERS TABLE

CREATE TABLE users
(
    userid INT (11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR (100) NOT NULL,
);

ALTER TABLE users
ADD PRIMARY KEY (id);


ALTER TABLE users
MODIFY userid INT
(11) NOT NULL AUTO_INCREMENT;


DESCRIBE users;

--BANKS TABLES
CREATE TABLE all_banks
(
    id INT(11) NOT NULL,
    title VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    DESCRIPTION text,
    userid INT (11),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(userid) REFERENCES users(userid)
);

ALTER TABLE all_banks
add PRIMARY KEY(id);

