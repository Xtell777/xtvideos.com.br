<?php
// Conecta-se ao banco de dados
$db_host = 'localhost'; // Endereço do servidor
$db_user = 'root'; // Usuário do banco de dados
$db_pass = ''; // Senha do banco de dados
$db_name = 'youweb'; // Nome do banco de dados
$db = new mysqli($db_host, $db_user, $db_pass, $db_name);
// Verifica se a conexão foi bem sucedida
if ($db->connect_error) {
    die('Erro ao conectar ao banco de dados: ' . $db->connect_error);
}
// Prepara a consulta SQL para selecionar todos os arquivos da tabela
$sql = "SELECT * FROM files";
$result = $db->query($sql);
// Verifica se a consulta retornou algum resultado
if ($result->num_rows > 0) {
    // Define o diretório onde os arquivos estão salvos
    $upload_dir = 'uploads/';
    // Percorre os resultados e exibe os dados e os arquivos dos arquivos
    while ($row = $result->fetch_assoc()) {
        // Obtém os dados do arquivo
        $file_name = $row['name'];
        $file_type = $row['type'];
        $file_size = $row['size'];
        $file_title = $row['title'];
        $file_description = $row['description'];
        // Exibe os dados do arquivo em uma tabela
        echo "<table>";
        echo "<tr><td>Nome:</td><td>$file_name</td></tr>";
        echo "<tr><td>Tipo:</td><td>$file_type</td></tr>";
        echo "<tr><td>Tamanho:</td><td>$file_size bytes</td></tr>";
        echo "<tr><td>Título:</td><td>$file_title</td></tr>";
        echo "<tr><td>Descrição:</td><td>$file_description</td></tr>";
        echo "</table>";
        // Verifica se o arquivo é uma imagem ou um vídeo
        if (strpos($file_type, 'image') !== false) {
            // Exibe o arquivo como uma imagem
            echo "<img src='$upload_dir$file_name' alt='$file_title'>";
        } elseif (strpos($file_type, 'video') !== false) {
            // Exibe o arquivo como um vídeo
            echo "<video src='$upload_dir$file_name' controls>$file_title</video>";
        }
        // Exibe uma linha horizontal para separar os arquivos
        echo "<hr>";
    }
} else {
    // Exibe uma mensagem de aviso
    echo "Nenhum arquivo foi enviado.";
}
// Fecha a conexão com o banco de dados
$db->close();
?>
