<script>
// Chave da API do YouTube
const API_KEY = 'AIzaSyCpD4WlboH2h0DtKSOv9d11iEKBjkF1swg';

// IDs dos vídeos do YouTube
const videoIds = ['AnY_VqxTTJI']; // Adicione mais IDs de vídeos conforme necessário

// Função para buscar dados do vídeo na API do YouTube
async function fetchVideoData(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items.length > 0) {
            const videoData = data.items[0];
            return {
                views: videoData.statistics.viewCount,
                comments: videoData.statistics.commentCount,
                publishDate: videoData.snippet.publishedAt,
                subscribers: await fetchChannelSubscribers(videoData.snippet.channelId) // Obtém inscritos
            };
        }
    } catch (error) {
        console.error("Erro ao buscar dados do vídeo:", error);
    }

    return null;
}

// Função para buscar o número de inscritos do canal
async function fetchChannelSubscribers(channelId) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items.length > 0) {
            return data.items[0].statistics.subscriberCount;
        }
    } catch (error) {
        console.error("Erro ao buscar dados do canal:", error);
    }

    return null;
}

// Função para atualizar o DOM com os dados do vídeo
async function updateVideoStats(videoId, elementIdSuffix) {
    const videoData = await fetchVideoData(videoId);
    if (videoData) {
        // Atualiza visualizações
        document.getElementById(`views-${elementIdSuffix}`).innerText = parseInt(videoData.views).toLocaleString("pt-BR");

        // Atualiza comentários
        document.getElementById(`comments-${elementIdSuffix}`).innerText = parseInt(videoData.comments).toLocaleString("pt-BR");

        // Calcula os dias desde a publicação
        const publishDate = new Date(videoData.publishDate);
        const daysSincePublish = Math.floor((new Date() - publishDate) / (1000 * 60 * 60 * 24));
        document.getElementById(`days-since-publish-${elementIdSuffix}`).innerText = daysSincePublish;

        // Atualiza inscritos
        document.getElementById(`subscribers-${elementIdSuffix}`).innerText = parseInt(videoData.subscribers).toLocaleString("pt-BR");
    }
}

// Função para atualizar todos os vídeos na página
function updateAllVideos() {
    videoIds.forEach((videoId, index) => {
        updateVideoStats(videoId, index + 1); // 'index + 1' corresponde ao sufixo dos elementos HTML (ex: 1, 2, 3...)
    });
}

// Atualizar os dados dos vídeos ao carregar a página
document.addEventListener('DOMContentLoaded', updateAllVideos);

</script>
