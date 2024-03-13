<script>
    // Função para se inscrever no canal
    function subscribeChannel() {
        // Aqui você pode adicionar a lógica para se inscrever no canal
        // Por exemplo, você pode fazer uma solicitação para uma API de inscrição
        // e exibir uma mensagem de confirmação
        alert("Você se inscreveu neste canal!");
    }

    // Função para lidar com interações de vídeo (like, dislike, love, hate)
    function handleVideoInteraction(videoId, interaction) {
        // Aqui você pode adicionar a lógica para lidar com as interações do vídeo
        // Por exemplo, atualizar contadores de likes, dislikes, visualizações, etc.
        // Você pode fazer solicitações para uma API para registrar essas interações
        // e atualizar as informações do vídeo conforme necessário
        console.log("Interacton:", interaction, "on video:", videoId);
    }

    // Função para mostrar a descrição do vídeo
    function showDescription() {
        // Aqui você pode adicionar a lógica para mostrar a descrição do vídeo
        // Por exemplo, você pode expandir ou mostrar um elemento de descrição oculto
        alert("Mostrar descrição do vídeo");
    }

    // Função para mostrar ou ocultar os comentários
    function toggleComments() {
        // Aqui você pode adicionar a lógica para mostrar ou ocultar os comentários
        // Por exemplo, você pode alternar a visibilidade de um elemento de comentários
        var commentsSection = document.querySelector('.comments-section');
        commentsSection.style.display = (commentsSection.style.display === 'none' || commentsSection.style.display === '') ? 'block' : 'none';
    }

    // Função para exibir a caixa de pesquisa por voz
    function playAudio() {
        // Aqui você pode adicionar a lógica para tocar um som de áudio e ativar o reconhecimento de voz
        // Por exemplo, você pode reproduzir um som de clique e iniciar o reconhecimento de voz
        alert("Tocar som de áudio e ativar reconhecimento de voz");
    }

    // Função para realizar uma pesquisa
    function search() {
        // Aqui você pode adicionar a lógica para realizar uma pesquisa
        // Por exemplo, você pode obter o termo de pesquisa do campo de entrada e redirecionar para a página de resultados de pesquisa
        alert("Realizar pesquisa com o termo digitado");
    }
    // Supondo que você tenha uma função que busca e retorna o número atual de inscritos do canal
// Essa função pode ser uma chamada para uma API ou um valor armazenado localmente
function getSubscribersCount() {
    // Aqui você retornaria o número atual de inscritos
    // Por exemplo, você pode retornar um valor fixo para testar a funcionalidade:
    return 550000;
}

// Função para atualizar o número de inscritos exibido na página
function updateSubscribersCount() {
    // Obtenha o elemento que mostra o número de inscritos pelo ID
    var subscribersElement = document.getElementById("channel-subscribers");
    
    // Obtenha o número atual de inscritos
    var currentSubscribersCount = getSubscribersCount();
    
    // Atualize o conteúdo do elemento com o novo número de inscritos
    subscribersElement.textContent = currentSubscribersCount.toLocaleString("pt-BR") + " inscritos";
}

// Chame a função para atualizar o número de inscritos quando necessário
// Por exemplo, após uma ação bem-sucedida de inscrição
updateSubscribersCount();

</script>

</section>

<!-- Script JavaScript -->
<script>
    function showDescription(videoId) {
        const description = document.querySelector(`#${videoId} .video-description`);
        if (description) {
            description.classList.toggle('show');
        }
    }

    function toggleComments(videoId) {
        const commentsSection = document.querySelector(`#${videoId} .comments-section`);
        if (commentsSection) {
            commentsSection.classList.toggle('show');
        }
    }
    
</script>


<script>

</script> 


      
 </div>




<!-- Adicione mais seções de vídeo conforme necessário, ajustando os IDs e chamadas de função -->

        
           
            </div>
<!-- Adicione esta parte do código JavaScript no final do seu arquivo -->
<script>
    let videoReactionCounts = {};
    let videoInteractionAllowed = {};

    // Número de vídeos desejado
    const numberOfVideos = 100;

    for (let i = 1; i <= numberOfVideos; i++) {
        const videoId = `video${i}`;
        videoReactionCounts[videoId] = {
            thinking: 999,
            heart: 999,
            devil: 999,
            smirk: 999
        };
        videoInteractionAllowed[videoId] = true;
    }

    function handleVideoInteraction(videoId, type) {
        if (videoInteractionAllowed[videoId]) {
            videoReactionCounts[videoId][type]++;
            updateReactionCounts(videoId);
            videoInteractionAllowed[videoId] = false;
        }
    }

    function updateReactionCounts(videoId) {
        const thinkingButton = document.querySelector(`#${videoId} .interaction-button:nth-child(1)`);
        const heartButton = document.querySelector(`#${videoId} .interaction-button:nth-child(2)`);
        const devilButton = document.querySelector(`#${videoId} .interaction-button:nth-child(3)`);
        const smirkButton = document.querySelector(`#${videoId} .interaction-button:nth-child(4)`);

        thinkingButton.innerHTML = `👍🏻 Like (${videoReactionCounts[videoId].thinking})`;
        heartButton.innerHTML = `👎🏻 Dislike (${videoReactionCounts[videoId].heart})`;
        devilButton.innerHTML = `😍 Amei (${videoReactionCounts[videoId].devil})`;
        smirkButton.innerHTML = `🤬 Odiei (${videoReactionCounts[videoId].smirk})`;
    }
    
    
    // Função para obter os dados do vídeo de uma API (simulada)
    async function fetchVideoData(videoId) {
        // Simulação de uma API que retorna dados do vídeo com base no videoId
        const videoData = {
            subscribers: Math.floor(Math.random() * 1000000), // Simulação de número aleatório de inscritos
            views: Math.floor(Math.random() * 10000000), // Simulação de número aleatório de visualizações
            publishDate: "Publicado há 3 dias", // Simulação de data de publicação
            comments: Math.floor(Math.random() * 1000), // Simulação de número aleatório de comentários
        };
        return videoData;
    }

    // Função para atualizar os números dos elementos HTML com os dados do vídeo
    async function updateVideoStats(videoId) {
        // Obter os dados do vídeo da API
        const videoData = await fetchVideoData(videoId);
        if (videoData) {
            // Atualizar os números dos elementos HTML
            const videoViewsId = `video-views-${videoId}`;
            document.getElementById(videoViewsId).textContent = videoData.views.toLocaleString("pt-BR") + " views";
            document.getElementById("channel-subscribers").textContent = videoData.subscribers.toLocaleString("pt-BR") + " inscritos";
            document.getElementById("video-publish-date").textContent = videoData.publishDate;
            const videoCommentsId = `video-comments-${videoId}`;
            document.getElementById(videoCommentsId).textContent = videoData.comments.toLocaleString("pt-BR") + " comentários";
        }
    }

    // Atualizar os números de todos os vídeos
    for (let i = 1; i <= numberOfVideos; i++) {
        updateVideoStats(`video${i}`);
    }
</script>





<script>
    // Função para verificar e atualizar as visualizações
    function checkAndUpdateViews(videoId) {
        const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos')) || {};

        if (!viewedVideos[videoId]) {
            // Se o vídeo não foi visualizado, incrementa o número de visualizações
            const videoStatsElement = document.querySelector(`#${videoId} .video-stats p:first-child span`);
            const currentViews = parseInt(videoStatsElement.innerText.replace(/\D/g, ''), 10);
            const newViews = currentViews + 1;

            // Atualiza a exibição no elemento HTML
            videoStatsElement.innerText = newViews.toLocaleString('pt-BR') + ' views';

            // Marca o vídeo como visualizado no Local Storage
            viewedVideos[videoId] = true;
            localStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));
        }
    }
</script>
<script>
    // Chama a função para verificar e atualizar as visualizações do vídeo1
    checkAndUpdateViews('video1');
</script>
<script>
        function subscribeChannel() {
            console.log("Você se inscreveu no canal!");
        }

        function showDescription() {
            const description = document.querySelector('.video-description');
            description.style.display = (description.style.display === 'none' || description.style.display === '') ? 'block' : 'none';
        }

        function shareVideo() {
            console.log("Vídeo compartilhado!");
        }
    </script>
<script>
    let videoReactionCounts = {};
    let videoInteractionAllowed = {};

    // Número de vídeos desejado
    const numberOfVideos = 100;

    for (let i = 1; i <= numberOfVideos; i++) {
        const videoId = `video${i}`;
        videoReactionCounts[videoId] = {
            thinking: 999,
            heart: 999,
            devil: 999,
            smirk: 999
        };
        videoInteractionAllowed[videoId] = true;
    }

    function handleVideoInteraction(videoId, type) {
        if (videoInteractionAllowed[videoId]) {
            videoReactionCounts[videoId][type]++;
            updateReactionCounts(videoId);
            videoInteractionAllowed[videoId] = false;
        }
    }

    function updateReactionCounts(videoId) {
        const thinkingButton = document.querySelector(`#${videoId} .interaction-button:nth-child(1)`);
        const heartButton = document.querySelector(`#${videoId} .interaction-button:nth-child(2)`);
        const devilButton = document.querySelector(`#${videoId} .interaction-button:nth-child(3)`);
        const smirkButton = document.querySelector(`#${videoId} .interaction-button:nth-child(4)`);

        thinkingButton.innerHTML = `👍🏻 Like (${videoReactionCounts[videoId].thinking})`;
        heartButton.innerHTML = `👎🏻 Dislike (${videoReactionCounts[videoId].heart})`;
        devilButton.innerHTML = `😍 Amei (${videoReactionCounts[videoId].devil})`;
        smirkButton.innerHTML = `🤬 Odiei (${videoReactionCounts[videoId].smirk})`;
    }
</script>


<script>
    // Função para verificar e atualizar as visualizações
    function checkAndUpdateViews(videoId) {
        const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos')) || {};

        if (!viewedVideos[videoId]) {
            // Se o vídeo não foi visualizado, incrementa o número de visualizações
            const videoStatsElement = document.querySelector(`#${videoId} .video-stats p:first-child span`);
            const currentViews = parseInt(videoStatsElement.innerText.replace(/\D/g, ''), 10);
            const newViews = currentViews + 1;

            // Atualiza a exibição no elemento HTML
            videoStatsElement.innerText = newViews.toLocaleString('pt-BR') + ' views';

            // Marca o vídeo como visualizado no Local Storage
            viewedVideos[videoId] = true;
            localStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));
        }
    }
</script>
<script>
    // Chama a função para verificar e atualizar as visualizações do vídeo1
    checkAndUpdateViews('video1');
</script>
<script>
        function subscribeChannel() {
            console.log("Você se inscreveu no canal!");
        }

        function showDescription() {
            const description = document.querySelector('.video-description');
            description.style.display = (description.style.display === 'none' || description.style.display === '') ? 'block' : 'none';
        }

        function shareVideo() {
            console.log("Vídeo compartilhado!");
        }
    


    <!-- Adicione esta parte do código JavaScript no final do seu arquivo -->

function updateSubscribersCount(count) {
    const subscribersElement = document.getElementById('channel-subscribers');
    subscribersElement.innerText = count.toLocaleString('pt-BR') + ' inscritos';
}

// Chame esta função quando precisar atualizar o número de subscrições
// Aqui está um exemplo de chamada (você pode ajustar conforme necessário)
updateSubscribersCount(500000);  // Substitua 500000 pelo número real de subscrições
function subscribeChannel() {
    // Simula um aumento no número de inscritos
    const currentSubscribersCount = 500000;  // Substitua pelo número real de inscritos
    const newSubscribersCount = currentSubscribersCount + 1;

    // Atualiza o número de inscritos exibido
    updateSubscribersCount(newSubscribersCount);

    console.log("Você se inscreveu no canal!");
}


    function updateViewsCount(count) {
    const viewsElement = document.getElementById('video-views');
    viewsElement.innerText = count.toLocaleString('pt-BR') + ' views';
}

// Chame esta função quando precisar atualizar o número de visualizações
// Aqui está um exemplo de chamada (você pode ajustar conforme necessário)
updateViewsCount(1234568);  // Substitua 1234568 pelo número real de visualizações
      

function checkAndUpdateViews(videoId) {
    const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos')) || {};

    if (!viewedVideos[videoId]) {
        // Se o vídeo não foi visualizado, incrementa o número de visualizações
        const videoStatsElement = document.querySelector(`#${videoId} .video-stats p:first-child span`);
        const currentViews = parseInt(videoStatsElement.innerText.replace(/\D/g, ''), 10);
        const newViews = currentViews + 1;

        // Atualiza a exibição no elemento HTML
        videoStatsElement.innerText = newViews.toLocaleString('pt-BR') + ' views';

        // Atualiza o número total de visualizações
        updateViewsCount(newViews);

        // Marca o vídeo como visualizado no Local Storage
        viewedVideos[videoId] = true;
        localStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));
    }
}

// Chama a função para verificar e atualizar as visualizações do vídeo1
checkAndUpdateViews('video1');


function updateCommentsCount(count) {
    const commentsElement = document.getElementById('video-comments');
    commentsElement.innerText = count.toLocaleString('pt-BR') + ' comentários';
}

// Chame esta função quando precisar atualizar o número de comentários
// Aqui está um exemplo de chamada (você pode ajustar conforme necessário)
updateCommentsCount(124);  // Substitua 124 pelo número real de comentários


function addComment() {
    var newComment = document.getElementById("comment-text").value;
    if (newComment !== "") {
        // Se o novo comentário for adicionado com sucesso
        // Simule um aumento no número de comentários
        const currentCommentsCount = 124;  // Substitua pelo número real de comentários
        const newCommentsCount = currentCommentsCount + 1;

        // Atualiza o número de comentários exibido
        updateCommentsCount(newCommentsCount);

        // ... restante do código para adicionar o comentário
    }
}

function updatePublishDate(date) {
    const publishDateElement = document.getElementById('video-publish-date');
    publishDateElement.innerText = 'Publicado ' + date;
}

function updateCommentsCount(count) {
    const commentsCountElement = document.getElementById('video-comments-count');
    commentsCountElement.innerText = count.toLocaleString('pt-BR') + ' comentários';
}

// Chame estas funções quando precisar atualizar as informações
// Aqui está um exemplo de chamada (você pode ajustar conforme necessário)

// Substitua 'há 3 dias' pela data real de publicação do vídeo
updatePublishDate('há 3 dias');

// Substitua 123 pelo número real de comentários
updateCommentsCount(123);

function subscribeChannel() {
    // Simula um novo vídeo sendo publicado
    const newPublishDate = 'há 1 dia';  // Substitua pela data real
    const newCommentsCount = 124;  // Substitua pelo número real de comentários

    // Atualiza as informações de data de publicação e contagem de comentários
    updatePublishDate(newPublishDate);
    updateCommentsCount(newCommentsCount);

    // Simula um aumento no número de inscritos
    const currentSubscribersCount = 500000;  // Substitua pelo número real de inscritos
    const newSubscribersCount = currentSubscribersCount + 1;

    // Atualiza o número de inscritos exibido
    updateSubscribersCount(newSubscribersCount);

    console.log("Você se inscreveu no canal!");
}


</script>

<script>
    // Função para verificar e atualizar as visualizações
    function checkAndUpdateViews(videoId) {
        const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos')) || {};

        if (!viewedVideos[videoId]) {
            // Se o vídeo não foi visualizado, incrementa o número de visualizações
            const videoStatsElement = document.querySelector(`#${videoId} .video-views`);
            const currentViews = parseInt(videoStatsElement.innerText.replace(/\D/g, ''), 10);
            const newViews = currentViews + 1;

            // Atualiza a exibição no elemento HTML
            videoStatsElement.innerText = newViews.toLocaleString('pt-BR') + ' views';

            // Marca o vídeo como visualizado no Local Storage
            viewedVideos[videoId] = true;
            localStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));
        }
    }
</script>


<script>
    function addComment() {
        var newComment = document.getElementById("comment-text").value;
        if (newComment !== "") {
            var commentDiv = document.createElement("div");
            commentDiv.className = "comment";
            commentDiv.innerHTML = '<h3>Novo Usuário</h3><p>' + newComment + '</p>';
            var commentList = document.getElementById("comment-list");
            commentList.appendChild(commentDiv);
            document.getElementById("comment-text").value = "";
        }
    }
    
    function addComment() {
        var newComment = document.getElementById("comment-text").value;
        if (newComment !== "") {
            var commentDiv = document.createElement("div");
            commentDiv.className = "comment";
            
            // Avatar
            var avatarDiv = document.createElement("div");
            avatarDiv.className = "comment-avatar";
            var avatarImg = document.createElement("img");
            avatarImg.src = "https://github.com/Xtell777/xtvideos.com.br/assets/157428126/ea34eb68-011c-4c9e-b7c0-6281550e515a";
            avatarImg.alt = "Avatar";
            avatarImg.className = "channel-avatar";
            avatarDiv.appendChild(avatarImg);
            commentDiv.appendChild(avatarDiv);
            
            // Conteúdo do comentário
            var contentDiv = document.createElement("div");
            contentDiv.className = "comment-content";
            var authorP = document.createElement("p");
            authorP.className = "comment-author";
            authorP.textContent = "Nome do Usuário"; // Aqui você pode adicionar o nome do usuário dinamicamente se tiver essa informação disponível
            var textP = document.createElement("p");
            textP.className = "comment-text";
            textP.textContent = newComment;
            contentDiv.appendChild(authorP);
            contentDiv.appendChild(textP);
            commentDiv.appendChild(contentDiv);

            var commentList = document.getElementById("comment-list");
            commentList.appendChild(commentDiv);
            document.getElementById("comment-text").value = "";
        }
    }

</script>




<script>
    function toggleComments() {
        const commentsSection = document.querySelector('.comments-section');
        if (commentsSection) {
            if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
                commentsSection.style.display = 'block';
            } else {
                commentsSection.style.display = 'none';
            }
        }
    }
</script>
<script>
    // Função para verificar e atualizar os números dos vídeos
    function updateVideoStats(videoId) {
        const subscribersElement = document.querySelector('.channel-subscribers');
        const viewsElement = document.querySelector(`#${videoId} .video-views`);
        const publishDateElement = document.querySelector(`#${videoId} .video-publish-date`);
        const commentsElement = document.querySelector(`#${videoId} .video-comments`);

        // Atualiza os números com base nos IDs
        subscribersElement.innerText = "600.000 inscritos"; // Exemplo: atualiza o número de inscritos
        viewsElement.innerText = "1.345.678 views"; // Exemplo: atualiza o número de visualizações
        publishDateElement.innerText = "Publicado há 4 dias"; // Exemplo: atualiza a data de publicação
        commentsElement.innerText = "234 comentários"; // Exemplo: atualiza o número de comentários
    }

    // Chamada de exemplo para atualizar os números do vídeo com ID "video9"
    updateVideoStats("video9");
</script>

<!-- Adicione este trecho de script no final do seu arquivo HTML, antes da tag de fechamento </body> -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const viewsElement = document.getElementById('video-views');

        function atualizarVisualizacoes() {
            // Simula um aumento de visualizações
            const visualizacoesAtuais = parseInt(viewsElement.innerText.replace(/\D/g, ''), 10); // Remove não dígitos
            const novoNumeroVisualizacoes = visualizacoesAtuais + Math.floor(Math.random() * 1000); // Adiciona visualizações aleatórias

            // Atualiza o elemento HTML
            viewsElement.innerText = novoNumeroVisualizacoes.toLocaleString() + ' views';
        }

        // Chama a função para atualizar visualizações a cada 5 segundos (altere conforme necessário)
        setInterval(atualizarVisualizacoes, 5000);
    });
</script>

 <script>
        let subscribersCount = 500000; // Valor inicial de inscritos

        function subscribeChannel() {
            // Simule a lógica de inscrição aqui (por exemplo, enviar uma solicitação para um servidor)
            // Você pode substituir este trecho pelo código real de inscrição no canal.

            // Exemplo: usuário inscrito
            subscribersCount++;
            updateSubscribersCount();
        }

        function updateSubscribersCount() {
            const subscribersElement = document.getElementById("channel-subscribers");
            subscribersElement.textContent = `${subscribersCount} inscritos`;
        }

        // Exemplo de uso:
        updateSubscribersCount(); // Atualiza o valor inicial exibido

        // Você pode chamar a função updateSubscribersCount() sempre que houver uma mudança real no número de inscritos.
    </script>

<script>
        let isUserSubscribed = false; // Variável para controlar a inscrição do usuário

        function subscribeChannel() {
            if (!isUserSubscribed) {
                // Simule a lógica de inscrição aqui (por exemplo, enviar uma solicitação para um servidor)
                // Você pode substituir este trecho pelo código real de inscrição no canal.

                // Exemplo: usuário inscrito
                isUserSubscribed = true;
                subscribersCount++;
                updateSubscribersCount();
            } else {
                console.log("Usuário já está inscrito.");
            }
        }

        function updateSubscribersCount() {
            const subscribersElement = document.getElementById("channel-subscribers");
            subscribersElement.textContent = `${subscribersCount} inscritos`;
        }

        // Exemplo de uso:
        updateSubscribersCount(); // Atualiza o valor inicial exibido
    </script>
    
     <script>
        let isUserSubscribed = false;
        let subscribersCount = 500000;
        let viewsCount = 1234567;
        let commentsCount = 123;
        const publishDate = new Date('2024-03-04'); // Data de publicação fictícia

        function subscribeChannel() {
            if (!isUserSubscribed) {
                // Simule a lógica de inscrição aqui (por exemplo, enviar uma solicitação para um servidor)
                // Você pode substituir este trecho pelo código real de inscrição no canal.

                // Exemplo: usuário inscrito
                isUserSubscribed = true;
                subscribersCount++;
                updateSubscribersCount();
            } else {
                console.log("Usuário já está inscrito.");
            }
        }

        function updateSubscribersCount() {
            const subscribersElement = document.getElementById("channel-subscribers");
            subscribersElement.textContent = `${subscribersCount} inscritos`;
        }

        function updateVideoStats() {
            viewsCount += Math.floor(Math.random() * 1000);
            commentsCount += Math.floor(Math.random() * 10);

            const viewsElement = document.getElementById("video-views");
            const commentsElement = document.getElementById("video-comments");
            const publishDateElement = document.getElementById("video-publish-date");
            const daysSincePublish = Math.floor((new Date() - publishDate) / (1000 * 60 * 60 * 24));

            viewsElement.textContent = `${viewsCount} views`;
            commentsElement.textContent = `${commentsCount} comentários`;
            publishDateElement.textContent = `Publicado há ${daysSincePublish} dias`;
        }

        // Exemplo de uso:
        updateSubscribersCount();
        updateVideoStats();
    </script>

<script>

document.addEventListener('DOMContentLoaded', function () {
    const numberOfVideos = 100; // Número desejado de vídeos
    const videoContainer = document.getElementById('video-container');

    for (let i = 1; i <= numberOfVideos; i++) {
        const videoId = `video${i}`;
        const videoTitle = `Vídeo ${i} - Título do Vídeo`;

        // Criação de elementos HTML para cada vídeo
        const videoSection = document.createElement('section');
        videoSection.id = videoId;
        videoSection.className = 'video-section';

        const videoTitleElement = document.createElement('h3');
        videoTitleElement.className = 'video-title';
        videoTitleElement.innerText = videoTitle;

        const videoContainerElement = document.createElement('div');
        videoContainerElement.className = 'video-container';

        const videoIframeElement = document.createElement('iframe');
        videoIframeElement.src = 'https://www.youtube.com/embed/VIDEO_ID'; // Substitua 'VIDEO_ID' pelo código de incorporação do seu vídeo
        videoIframeElement.frameborder = '0';
        videoIframeElement.allowfullscreen = true;

        const videoStatsElement = document.createElement('div');
        videoStatsElement.className = 'video-stats';

        const viewsElement = document.createElement('p');
        viewsElement.className = 'video-views';
        viewsElement.id = `${videoId}-views`;
        viewsElement.innerText = '0 views';

        // Adiciona os elementos ao contêiner do vídeo
        videoContainerElement.appendChild(videoIframeElement);
        videoStatsElement.appendChild(viewsElement);

        videoSection.appendChild(videoTitleElement);
        videoSection.appendChild(videoContainerElement);
        videoSection.appendChild(videoStatsElement);

        // Adiciona o vídeo ao contêiner principal
        videoContainer.appendChild(videoSection);
    }
});

</script>
