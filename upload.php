<?php
// Verifica se o arquivo foi enviado corretamente
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    
    // Configurações do banco de dados
    $servername = "localhost";
    $username = "Root";
    $password = "tubarao777";
    $dbname = "streamflix_db";

    // Conecta ao banco de dados
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica a conexão
    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    // Move o arquivo para o diretório de uploads
    $uploadDirectory = 'uploads/';
    $targetFilePath = $uploadDirectory . basename($file['name']);
    if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
        // Insere as informações do arquivo no banco de dados
        $sql = "INSERT INTO uploaded_files (title, description, file_path) VALUES ('$title', '$description', '$targetFilePath')";
        if ($conn->query($sql) === TRUE) {
            echo "Arquivo enviado com sucesso!";
        } else {
            echo "Erro ao enviar o arquivo para o banco de dados: " . $conn->error;
        }
    } else {
        echo "Erro ao mover o arquivo para o diretório de uploads.";
    }

    // Fecha a conexão com o banco de dados
    $conn->close();
} else {
    echo "Nenhum arquivo enviado ou método de requisição inválido.";
}
?>
