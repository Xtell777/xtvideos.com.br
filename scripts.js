document.getElementById('upload-button').addEventListener('click', async function() {
    try {
        const fileInput = document.getElementById('file');
        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');

        const file = fileInput.files[0];
        const title = titleInput.value;
        const description = descriptionInput.value;

        if (!file || !title) {
            throw new Error("Por favor, selecione um arquivo e insira um título.");
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // Aqui você pode atualizar a interface do usuário com o progresso do upload, se necessário
            }
        });

        console.log(response.data);
        // Aqui você pode fazer algo com a resposta, como mostrar uma mensagem de sucesso
    } catch (error) {
        console.error('Erro durante o upload:', error);
        // Aqui você pode lidar com o erro, como mostrar uma mensagem de erro ao usuário
        alert('Ocorreu um erro ao enviar o arquivo.');
    }
});

