CREATE DATABASE youweb;
USE youweb;
CREATE TABLE videos (
    id VARCHAR(32) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL
);
