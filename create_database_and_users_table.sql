-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS mydatabase;

-- Seleciona o banco de dados criado
USE mydatabase;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    google_id VARCHAR(255),
    facebook_id VARCHAR(255)
);

