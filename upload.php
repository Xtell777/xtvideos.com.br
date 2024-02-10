<?php
// Verifica se o arquivo foi enviado corretamente
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    
    // Verifica se houve algum erro no upload do arquivo
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo "Erro ao enviar o arquivo: ";
        switch ($file['error']) {
            case UPLOAD_ERR_INI_SIZE:
                echo "O arquivo enviado excede o limite definido na configuração do PHP (upload_max_filesize).";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                echo "O arquivo enviado excede o limite definido no formulário HTML.";
                break;
            case UPLOAD_ERR_PARTIAL:
                echo "O arquivo foi enviado apenas parcialmente.";
                break;
            case UPLOAD_ERR_NO_FILE:
                echo "Nenhum arquivo foi enviado.";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                echo "Faltando um diretório temporário.";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                echo "Falha ao gravar o arquivo em disco.";
                break;
            case UPLOAD_ERR_EXTENSION:
                echo "Uma extensão do PHP interrompeu o upload do arquivo.";
                break;
            default:
                echo "Erro desconhecido.";
                break;
        }
        exit;
    }
    
    // Move o arquivo para o diretório de uploads
    $uploadDirectory = 'uploads/';
    $targetFilePath = $uploadDirectory . basename($file['name']);
    if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
        // Sucesso ao mover o arquivo, agora insere as informações no banco de dados
        $servername = "localhost";
        $username = "root";
        $password = "tubarao777";
        $dbname = "streamflix_db";

        // Conecta ao banco de dados
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Falha na conexão com o banco de dados: " . $conn->connect_error);
        }

        // Insere as informações do arquivo no banco de dados
        $sql = "INSERT INTO uploaded_files (title, description, file_path) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $title, $description, $targetFilePath);
        if ($stmt->execute()) {
            echo "Arquivo enviado com sucesso!";
        } else {
            echo "Erro ao enviar o arquivo para o banco de dados: " . $conn->error;
        }
        $stmt->close();
        $conn->close();
    } else {
        echo "Erro ao mover o arquivo para o diretório de uploads.";
    }
} else {
    echo "Nenhum arquivo enviado ou método de requisição inválido.";
}
?>

