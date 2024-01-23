<?php
// Conectando ao banco de dados MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "youweb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Obtendo os dados do formulário de upload
$mediaFile = $_FILES["mediaFile"];
$mediaId = $_POST["mediaId"];

// Validando o tipo e o tamanho do arquivo
$allowedTypes = array("image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm", "video/ogg");
$maxSize = 10000000; // 10 MB

if (!in_array($mediaFile["type"], $allowedTypes)) {
  die("Tipo de arquivo não permitido");
}

if ($mediaFile["size"] > $maxSize) {
  die("Tamanho de arquivo excedido");
}

// Salvando o arquivo em uma pasta chamada media
$targetDir = "media/";
$targetFile = $targetDir . basename($mediaFile["name"]);

if (move_uploaded_file($mediaFile["tmp_name"], $targetFile)) {
  echo "Upload bem-sucedido! Media URL: " . $targetFile;
} else {
  die("Erro ao salvar o arquivo");
}

// Inserindo os dados do arquivo no banco de dados
$sql = "INSERT INTO media (mediaId, mediaUrl, mediaType, mediaSize) VALUES ('$mediaId', '$targetFile', '$mediaFile[type]', '$mediaFile[size]')";

if ($conn->query($sql) === TRUE) {
  echo "Dados inseridos no banco de dados";
} else {
  die("Erro ao inserir os dados: " . $conn->error);
}

// Fechando a conexão com o banco de dados
$conn->close();
?>
