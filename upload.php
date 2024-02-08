<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    
    $servername = "localhost";
    $username = "Root";
    $password = "tubarao777";
    $dbname = "streamflix_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    $uploadDirectory = 'uploads/';
    $targetFilePath = $uploadDirectory . basename($file['name']);
    if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
        $sql = "INSERT INTO uploaded_files (title, description, file_path) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $title, $description, $targetFilePath);
        if ($stmt->execute()) {
            echo "Arquivo enviado com sucesso!";
        } else {
            echo "Erro ao enviar o arquivo para o banco de dados: " . $conn->error;
        }
    } else {
        echo "Erro ao mover o arquivo para o diretório de uploads.";
    }

    $conn->close();
} else {
    echo "Nenhum arquivo enviado ou método de requisição inválido.";
}
?>
