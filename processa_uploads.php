<?php
// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Diretório onde os vídeos serão armazenados
    $target_dir = "uploaded/";

    // Nome do arquivo de vídeo
    $video_name = htmlspecialchars(basename($_FILES["video"]["name"]));
    // Caminho completo do arquivo de vídeo
    $target_file = $target_dir . $video_name;
    // Tipo de arquivo
    $videoFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Verifica se o arquivo de vídeo é válido
    $valid = true;
    $allowed_types = array("mp4", "avi", "mov", "wmv");
    if (!in_array($videoFileType, $allowed_types)) {
        echo "Desculpe, apenas arquivos MP4, AVI, MOV e WMV são permitidos.";
        $valid = false;
    }

    // Verifica o tamanho do arquivo (até 3GB)
    $max_size = 3 * 1024 * 1024 * 1024; // 3GB
    if ($_FILES["video"]["size"] > $max_size) {
        echo "Desculpe, seu arquivo é muito grande. O tamanho máximo é de 3GB.";
        $valid = false;
    }

    // Verifica a duração do vídeo (até 3 horas)
    $max_duration = 3 * 60 * 60; // 3 horas em segundos
    $video_duration = get_video_duration($_FILES["video"]["tmp_name"]); // Função a ser implementada
    if ($video_duration > $max_duration) {
        echo "Desculpe, seu vídeo é muito longo. A duração máxima é de 3 horas.";
        $valid = false;
    }

    // Se o arquivo for válido, faz o upload
    if ($valid) {
        if (move_uploaded_file($_FILES["video"]["tmp_name"], $target_file)) {
            // Exibe as informações do vídeo
            display_video_info($video_name, $target_file, $videoFileType);

            // Exibe informações adicionais
            display_additional_info($_POST["channel_image"], $_POST["channel_name"], $_POST["channel_subscribers"], $_POST["video_views"], $_POST["publish_date"], $_POST["video_comments"]);

            // Exibe a seção de interação
            display_interaction_section('video1');

            // Exibe a barra de interação
            display_interaction_bar();

            // Exibe a descrição do vídeo
            echo '<div class="video-description">';
            echo '<p>' . htmlspecialchars($_POST["video_description"]) . '</p>';
            echo '</div>';

            // Exibe a seção de comentários
            display_comments_section('comment-list-2');
        } else {
            echo "Desculpe, ocorreu um erro ao fazer o upload do arquivo.";
        }
    }
}

// Função para obter a duração do vídeo (em segundos)
function get_video_duration($file) {
    $ffmpeg = "ffmpeg"; // Caminho para o executável ffmpeg
    $cmd = "$ffmpeg -i $file 2>&1";
    exec($cmd, $output);

    foreach ($output as $line) {
        if (strpos($line, 'Duration:') !== false) {
            $duration_str = explode(" ", $line)[3]; // Extrai a parte da duração do output
            $duration_array = explode(":", $duration_str); // Divide a string em horas, minutos e segundos
            $duration = $duration_array[0] * 3600 + $duration_array[1] * 60 + round($duration_array[2]); // Calcula a duração total em segundos
            return $duration;
        }
    }
    return 0; // Retorna 0 se não encontrar a duração
}

// Função para exibir as informações do vídeo
function display_video_info($video_name, $target_file, $videoFileType) {
    echo '<section class="video-section">';
    echo '<h3 class="video-title">' . $video_name . '</h3>';
    echo '<p class="video-rating">Classificação: ' . htmlspecialchars($_POST["rating"]) . '</p>';
    echo '<div class="video-container">';
    echo '<video controls><source src="' . $target_file . '" type="video/' . $videoFileType . '"></video>';
    echo '</div>';
    echo '</section>';
}

// Função para exibir informações adicionais
function display_additional_info($channel_image, $channel_name, $channel_subscribers, $video_views, $publish_date, $video_comments) {
    echo '<div class="video-info-container">';
    echo '<div class="channel-info">';
    echo '<img src="' . htmlspecialchars($channel_image) . '" alt="Imagem do canal" class="channel-image">';
    echo '<p class="channel-name">' . htmlspecialchars($channel_name) . '</p>';
    echo '<div class="subscribe-button" onclick="subscribeChannel()">';
    echo '<span>Inscreva-se</span>';
    echo '<i class="fa fa-bell"></i>';
    echo '</div>';
    echo '</div>';
    echo '</div>';

    // Exibe estatísticas do vídeo
    echo '<div class="video-stats">';
    echo '<p class="channel-subscribers"><i class="fa fa-users"></i> ' . htmlspecialchars($channel_subscribers) . '</p>';
    echo '<p class="video-views"><i class="fa fa-eye"></i> ' . htmlspecialchars($video_views) . '</p>';
    echo '<p class="video-publish-date"><i class="fa fa-calendar"></i> ' . htmlspecialchars($publish_date) .'</p>';
    echo '<p class="video-comments"><i class="fa fa-comments"></i> ' . htmlspecialchars($video_comments) . '</p>';
    echo '</div>';
}

// Função para exibir a seção de interação
function display_interaction_section($video_id) {
    echo '<section id="' . $video_id . '" class="video-section">';
    echo '<div class="interaction-bar">';
    echo '<div class="interaction-button" onclick="handleVideoInteraction(\'' . $video_id . '\', \'thinking\')"><i class="fa fa-thumbs-up"></i> Like</div>';
    echo '<div class="interaction-button" onclick="handleVideoInteraction(\'' . $video_id . '\', \'heart\')"><i class="fa fa-thumbs-down"></i> Dislike</div>';
    echo '<div class="interaction-button" onclick="handleVideoInteraction(\'' . $video_id . '\', \'devil\')"><i class="fa fa-heart"></i> Amei</div>';
    echo '<div class="interaction-button" onclick="handleVideoInteraction(\'' . $video_id . '\', \'smirk\')"><i class="fa fa-meh"></i> Odiei</div>';
    echo '</div>';
    echo '</section>';
}

// Função para exibir a barra de interação
function display_interaction_bar() {
    echo '<div class="interaction-bar">';
    echo '<div class="interaction-buttons">';
    echo '<a href="denuncia.html" target="_blank" class="interaction-button small"><i class="fa fa-ban"></i> Denunciar</a>';
    echo '<button class="interaction-button small" onclick="shareVideo(\'video1\')"><i class="fa fa-share"></i> Compartilhar</button>';
    echo '<button class="interaction-button small" onclick="downloadVideo(\'video1\')"><i class="fa fa-download"></i> Download</button>';
    echo '</div>';
    echo '</div>';
}

// Função para exibir a seção de comentários
function display_comments_section($comment_list_id) {
    echo '<div class="comments-section">';
    echo '<h3>Comentários</h3>';
    echo '<div id="' . $comment_list_id . '" class="comment-list">';
    echo '<!-- Lista de comentários será exibida aqui -->';
    echo '</div>';
    echo '<div id="comment-form-2" class="comment-form">';
    echo '<textarea id="comment-text-2" placeholder="Adicione um comentário..." class="comment-input"></textarea>';
    echo '<button onclick="addComment(\'' . $comment_list_id . '\', \'comment-text-2\')" class="comment-button">Comentar</button>';
    echo '</div>';
    echo '</div>';
}
?>

