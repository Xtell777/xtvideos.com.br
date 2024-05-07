<?php
// Conexão com o banco de dados (substitua as informações conforme necessário)
$servername = "localhost";
$username = "seu_usuario";
$password = "sua_senha";
$dbname = "nome_do_banco_de_dados";

// Criar conexão
$conn = new mysqli($servername, $username, $password);

// Verificar conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Criar o banco de dados
$sql_create_db = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql_create_db) === FALSE) {
    echo "Erro ao criar o banco de dados: " . $conn->error;
}

// Selecionar o banco de dados criado
$conn->select_db($dbname);

// Criar a tabela para armazenar as denúncias de vídeos
$sql_create_table = "CREATE TABLE IF NOT EXISTS reports (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    problem_description TEXT NOT NULL,
    nature VARCHAR(255) NOT NULL,
    additional_details TEXT,
    confirmation TINYINT(1) NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql_create_table) === FALSE) {
    echo "Erro ao criar a tabela: " . $conn->error;
} else {
    echo "Banco de dados e tabela criados com sucesso!";
}

$conn->close();
?>
