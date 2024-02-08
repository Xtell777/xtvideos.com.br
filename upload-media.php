<?php
// Verifica se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Verifica se o arquivo foi enviado
    if (isset($_FILES['file'])) {
        // Obtém o nome, o tipo e o tamanho do arquivo
        $file_name = $_FILES['file']['name'];
        $file_type = $_FILES['file']['type'];
        $file_size = $_FILES['file']['size'];
        // Obtém o título e a descrição do arquivo
        $file_title = $_POST['title'];
        $file_description = $_POST['description'];
        // Define o diretório onde os arquivos serão salvos
        $upload_dir = 'uploads/';
        // Define os tipos de arquivos permitidos
        $allowed_types = array('image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm');
        // Define o tamanho máximo do arquivo em bytes
        $max_size = 10 * 1024 * 1024; // 10 MB
        // Verifica se o tipo do arquivo é permitido
        if (in_array($file_type, $allowed_types)) {
            // Verifica se o tamanho do arquivo não excede o limite
            if ($file_size <= $max_size) {
                // Move o arquivo temporário para o diretório de destino
                if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_dir . $file_name)) {
                    // Conecta-se ao banco de dados
                    $db_host = 'localhost'; // Endereço do servidor
                    $db_user = 'root'; // Usuário do banco de dados
                    $db_pass = 'tubarao777'; // Senha do banco de dados
                    $db_name = 'streamflix_db'; // Nome do banco de dados
                    $db = new mysqli($db_host, $db_user, $db_pass, $db_name);
                    // Verifica se a conexão foi bem sucedida
                    if ($db->connect_error) {
                        die('Erro ao conectar ao banco de dados: ' . $db->connect_error);
                    }
                    // Prepara a consulta SQL para inserir os dados do arquivo na tabela
                    $sql = "INSERT INTO files (name, type, size, title, description) VALUES (?, ?, ?, ?, ?)";
                    $stmt = $db->prepare($sql);
                    // Verifica se a consulta foi preparada corretamente
                    if ($stmt) {
                        // Associa os valores aos parâmetros da consulta
                        $stmt->bind_param('ssiss', $file_name, $file_type, $file_size, $file_title, $file_description);
                        // Executa a consulta
                        if ($stmt->execute()) {
                            // Fecha a consulta e a conexão
                            $stmt->close();
                            $db->close();
                            // Exibe uma mensagem de sucesso
                            echo 'Arquivo enviado com sucesso!';
                        } else {
                            // Exibe uma mensagem de erro
                            echo 'Erro ao inserir os dados do arquivo no banco de dados: ' . $stmt->error;
                        }
                    } else {
                        // Exibe uma mensagem de erro
                        echo 'Erro ao preparar a consulta SQL: ' . $db->error;
                    }
                } else {
                    // Exibe uma mensagem de erro
                    echo 'Erro ao mover o arquivo para o diretório de destino.';
                }
            } else {
                // Exibe uma mensagem de erro
                echo 'O arquivo excede o tamanho máximo permitido.';
            }
        } else {
            // Exibe uma mensagem de erro
            echo 'O tipo do arquivo não é permitido.';
        }
    } else {
        // Exibe uma mensagem de erro
        echo 'Nenhum arquivo foi enviado.';
    }
} else {
    // Exibe uma mensagem de erro
    echo 'Método de requisição inválido.';
}
?>
