document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const uploadedFilesContainer = document.getElementById('uploaded-files');

    uploadButton.addEventListener('click', function () {
        if (fileInput.checkValidity()) {
            const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            const file = {
                id: uniqueId,
                name: titleInput.value,
                description: descriptionInput.value,
            };

            appendFileToUI(file);

            fileInput.value = '';
            titleInput.value = '';
            descriptionInput.value = '';

            uploadFileToServer(file);
        } else {
            alert('Por favor, selecione um arquivo válido.');
        }
    });

    function appendFileToUI(file) {
        const fileDiv = document.createElement('div');
        fileDiv.innerHTML = '<p>ID: ' + file.id + '</p>' +
                            '<p>Nome: ' + file.name + '</p>' +
                            '<p>Descrição: ' + file.description + '</p>' +
                            '<hr>';

        uploadedFilesContainer.appendChild(fileDiv);
    }

    function uploadFileToServer(file) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.textContent = '0%';

        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-button';
        cancelButton.textContent = 'Cancelar';

        uploadedFilesContainer.appendChild(progressBar);
        uploadedFilesContainer.appendChild(cancelButton);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/action_page.php');

        xhr.upload.addEventListener('progress', function (event) {
            const percent = Math.round((event.loaded / event.total) * 100);
            progressBar.style.width = percent + '%';
            progressBar.textContent = percent + '%';
        });

        xhr.addEventListener('load', function () {
            progressBar.textContent = 'Upload concluído!';
        });

        xhr.addEventListener('error', function () {
            progressBar.style.backgroundColor = 'red';
            progressBar.textContent = 'Erro no upload!';
        });

        cancelButton.addEventListener('click', function () {
            xhr.abort();
            uploadedFilesContainer.removeChild(progressBar);
            uploadedFilesContainer.removeChild(cancelButton);
        });

        xhr.send(formData);
    }
});

