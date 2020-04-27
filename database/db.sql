CREATE DATABASE database_links;

USE database_links;

--USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- LINKS TABLE
CREATE TABLE links (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11), 
  created_at timestamp NOT NULL DEFAULT current_timestamp, 
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;
--CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)


--Prova Clases

CREATE DATABASE database_r;

USE database_r;

--USERS_R TABLE
CREATE TABLE users_r(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    rol VARCHAR(16)
);

ALTER TABLE users_r
    ADD PRIMARY KEY (id);

ALTER TABLE users_r
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users_r;

--ROOMS TABlE
CREATE TABLE rooms (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  room_id VARCHAR(150) NOT NULL,
  description TEXT,
  user_id INT(11) NOT NULL, 
  created_at timestamp NOT NULL DEFAULT current_timestamp
  
);

ALTER TABLE rooms
  ADD PRIMARY KEY (id);

ALTER TABLE rooms
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE rooms;



--PARTICIPANTS TABLE
CREATE TABLE participants (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  room_id VARCHAR(150) NOT NULL,
  user_id INT(11) NOT NULL,
  rol  VARCHAR(16)
);

ALTER TABLE participants
  ADD PRIMARY KEY (id);

ALTER TABLE participants
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE participants;
