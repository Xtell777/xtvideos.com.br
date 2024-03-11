<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se um arquivo foi enviado
    if (isset($_FILES["file"]) && $_FILES["file"]["error"] == UPLOAD_ERR_OK) {
        $uploadDir = "uploads/"; // Diretório onde os arquivos serão armazenados
        $fileName = basename($_FILES["file"]["name"]); // Nome do arquivo
        $targetFilePath = $uploadDir . $fileName; // Caminho completo do arquivo
        
        // Move o arquivo enviado para o diretório de upload
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
            echo "Arquivo enviado com sucesso. ";
            echo "Link para o vídeo: <a href=\"$targetFilePath\">$fileName</a>";
        } else {
            echo "Erro ao enviar o arquivo.";
        }
    } elseif (!empty($_POST["video_url"])) {
        // Se um URL de vídeo foi fornecido, exibe o link para o vídeo
        $videoUrl = $_POST["video_url"];
        echo "Link para o vídeo: <a href=\"$videoUrl\">$videoUrl</a>";
    } else {
        echo "Por favor, selecione um arquivo ou forneça um URL de vídeo.";
    }
}
?>
