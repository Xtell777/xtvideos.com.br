<?php

// Verifica se os dados foram enviados via método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (isset($_POST["fullname"]) && isset($_POST["username"]) && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["confirm_password"])) {
        // Recupera os valores dos campos do formulário
        $fullname = $_POST["fullname"];
        $username = $_POST["username"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $confirm_password = $_POST["confirm_password"];

        // Verifica se as senhas coincidem
        if ($password === $confirm_password) {
            // Aqui você pode adicionar código para verificar a validade do nome de usuário, email, senha, etc.
            
            // Conectar ao banco de dados e inserir os dados do usuário (substitua 'localhost', 'username', 'password' e 'database' com suas próprias configurações)
            $conn = new mysqli("localhost", "username", "password", "database");

            // Verifica se a conexão foi estabelecida com sucesso
            if ($conn->connect_error) {
                die("Erro de conexão com o banco de dados: " . $conn->connect_error);
            }

            // Prepara a consulta SQL para inserir o novo usuário no banco de dados
            $sql = "INSERT INTO users (fullname, username, email, password) VALUES ('$fullname', '$username', '$email', '$password')";

            // Executa a consulta SQL
            if ($conn->query($sql) === TRUE) {
                echo "Usuário registrado com sucesso!";
            } else {
                echo "Erro ao registrar o usuário: " . $conn->error;
            }

            // Fecha a conexão com o banco de dados
            $conn->close();
        } else {
            echo "As senhas não coincidem!";
        }
    } else {
        echo "Todos os campos devem ser preenchidos!";
    }
} else {
    echo "Este script só aceita solicitações POST!";
}

?>
