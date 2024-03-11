// Função para criar e exibir um vídeo com informações fornecidas
function displayVideo(videoTitle, videoUrl, channelImage, channelName, subscribers, views, publishDate, comments) {
    // Criação dos elementos HTML
    const videoSection = document.createElement("section");
    videoSection.classList.add("video-section");

    const videoTitleElement = document.createElement("h3");
    videoTitleElement.classList.add("video-title");
    videoTitleElement.textContent = videoTitle;

    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");

    const videoFrame = document.createElement("iframe");
    videoFrame.setAttribute("src", videoUrl);
    videoFrame.setAttribute("frameborder", "0");
    videoFrame.setAttribute("allowfullscreen", "");

    const videoInfoContainer = document.createElement("div");
    videoInfoContainer.classList.add("video-info-container");

    const channelInfo = document.createElement("div");
    channelInfo.classList.add("channel-info");

    const channelImageElement = document.createElement("img");
    channelImageElement.setAttribute("src", channelImage);
    channelImageElement.setAttribute("alt", "Imagem do canal");
    channelImageElement.classList.add("channel-image");

    const channelNameElement = document.createElement("p");
    channelNameElement.classList.add("channel-name");
    channelNameElement.textContent = channelName;

    const subscribeButton = document.createElement("div");
    subscribeButton.classList.add("subscribe-button");
    subscribeButton.setAttribute("onclick", "subscribeChannel()");
    subscribeButton.innerHTML = `
        <span>Inscreva-se</span>
        <i class="fa fa-bell"></i>
    `;

    const videoStats = document.createElement("div");
    videoStats.classList.add("video-stats");
    videoStats.innerHTML = `
        <p class="channel-subscribers">${subscribers} inscritos</p>
        <p class="video-views">${views} views</p>
        <p class="video-publish-date">${publishDate}</p>
        <p class="video-comments">${comments} comentários</p>
    `;

    // Adiciona os elementos criados à estrutura HTML
    channelInfo.appendChild(channelImageElement);
    channelInfo.appendChild(channelNameElement);
    channelInfo.appendChild(subscribeButton);

    videoInfoContainer.appendChild(channelInfo);
    videoInfoContainer.appendChild(videoStats);

    videoContainer.appendChild(videoFrame);

    videoSection.appendChild(videoTitleElement);
    videoSection.appendChild(videoContainer);
    videoSection.appendChild(videoInfoContainer);

    // Adiciona o vídeo à página
    document.body.appendChild(videoSection);
}

// Chamada da função para exibir um vídeo com as informações fornecidas
displayVideo(
    "Vídeo teste pro site 1❤️",
    "https://github.com/Xtell777/xtvideos.com.br/assets/157428126/285598f2-2920-4475-b7db-3df06d0fcff3",
    "https://github.com/Xtell777/xtvideos.com.br/assets/157428126/ea34eb68-011c-4c9e-b7c0-6281550e515a",
    "XTELL777",
    "500.000",
    "1.234.567",
    "Publicado há 3 dias",
    "123"
);

