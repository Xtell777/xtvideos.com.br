document.getElementById('upload-button').addEventListener('click', function() {
    var fileInput = document.getElementById('file');
    var titleInput = document.getElementById('title');
    var descriptionInput = document.getElementById('description');

    var file = fileInput.files[0];
    var title = titleInput.value;
    var description = descriptionInput.value;

    var formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    axios.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    }).then(function(response) {
        console.log(response.data);
        // Aqui você pode fazer algo com a resposta, como mostrar uma mensagem de sucesso
    }).catch(function(error) {
        console.error('Erro durante o upload:', error);
        // Aqui você pode lidar com o erro, como mostrar uma mensagem de erro ao usuário
    });
});
