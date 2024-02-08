-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS streamflix_db;

-- Utiliza o banco de dados criado
USE adm_user;

-- Cria a tabela uploaded_files
CREATE TABLE IF NOT EXISTS uploaded_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
